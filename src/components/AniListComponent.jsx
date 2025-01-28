import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import '../styles/anilist.css';

// Components
import Pagination from './anilist/paginationWrapper.jsx';
import ScoreDisplay from './anilist/scoreDisplay';
import ProgressDisplay from './anilist/progressDisplay';
import DateDisplay from './anilist/dateDisplay';
import GenreDisplay from './anilist/genreDisplay.jsx';
import TagsDisplay from './anilist/tagsDisplay.jsx';
import GenreFilter from './anilist/genreFilter.jsx';
import CustomDropdown from '../components/customDropdown.jsx';
import AnilistSearchBar from './anilist/anilistSearchBar.jsx';
import DescriptionDisplay from './anilist/descriptionDisplay.jsx';

// Constants
const ITEMS_PER_PAGE = 12;
const STATUS_OPTIONS = [
  { value: 'ALL', label: 'All' },
  { value: 'CURRENT', label: 'Reading' },
  { value: 'PLANNING', label: 'Planning' },
  { value: 'COMPLETED', label: 'Finished' },
  { value: 'DROPPED', label: 'Dropped' },
  { value: 'PAUSED', label: 'Paused' },
  { value: 'REPEATING', label: 'Repeating' },
];
const SORT_OPTIONS = [
  { value: 'title', label: 'Sort by Title' },
  { value: 'score', label: 'Sort by Score' },
  { value: 'progress', label: 'Sort by Progress' },
];

const AniListComponent = () => {
  // State management
  const [animeList, setAnimeList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(() =>
    localStorage.getItem('selectedStatus') || 'ALL'
  );
  const [selectedGenre, setSelectedGenre] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('title');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [genresWithCount, setGenresWithCount] = useState([]);
  const [username, setUsername] = useState('ajisai'); // Default username

  // Memoized data processing
  const preprocessedList = useMemo(() =>
    animeList.map(entry => ({
      ...entry,
      searchString: [
        entry.media.title?.romaji?.toLowerCase() || '',
        entry.media.title?.english?.toLowerCase() || '',
        ...(entry.media.tags || []).map(tag => tag.name?.toLowerCase() || '')
      ].join(' ')
    })),
    [animeList]
  );

  // Filtering and sorting
  const filteredAnimeList = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return preprocessedList.filter(({ status, media, searchString }) => {
      const statusMatch = selectedStatus === 'ALL' || status === selectedStatus;
      const genreMatch = !selectedGenre || (media.genres || []).includes(selectedGenre);
      const searchMatch = !normalizedSearch || searchString.includes(normalizedSearch);

      return statusMatch && genreMatch && searchMatch;
    });
  }, [preprocessedList, selectedStatus, selectedGenre, searchTerm]);

  const sortedAnimeList = useMemo(() => {
    const collator = new Intl.Collator(undefined, { sensitivity: 'base' });
    return [...filteredAnimeList].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return collator.compare(a.media.title.romaji, b.media.title.romaji);
        case 'score':
          return (b.score || 0) - (a.score || 0);
        case 'progress':
          return (b.progress || 0) - (a.progress || 0);
        default: return 0;
      }
    });
  }, [filteredAnimeList, sortBy]);

  // Pagination
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedAnimeList.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedAnimeList, currentPage]);

  // Data fetching
  useEffect(() => {
    const source = axios.CancelToken.source();
    let isMounted = true;

    const fetchAnimeList = async () => {
      if (!isMounted) return;
      setLoading(true);
      setError(null);

      try {
        const response = await axios({
          url: 'https://graphql.anilist.co',
          method: 'post',
          data: { query: ANIME_LIST_QUERY(username) },
          cancelToken: source.token,
          timeout: 15000, // Increased timeout
        });

        if (response.data.errors) throw new Error('API Error');

        const entries = processApiResponse(response);
        if (!isMounted) return;

        setAnimeList(entries);
        setGenresWithCount(calculateGenreCounts(entries));
      } catch (error) {
        if (error.code === 'ECONNABORTED') {
          setError('Request timed out. Please try again.');
        } else {
          handleFetchError(error, isMounted, setError);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAnimeList();
    return () => {
      isMounted = false;
      source.cancel();
    };
  }, [username]);

  // Event handlers
  const debouncedSearchChange = useCallback(
    debounce((query) => {
      setSearchTerm(query);
      setCurrentPage(1);
    }, 300),
    []
  );

  const handleSearchChange = (query) => {
    debouncedSearchChange(query);
  };

  const handleStatusChange = useCallback(({ value }) => {
    setSelectedStatus(value);
    localStorage.setItem('selectedStatus', value);
    setCurrentPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedStatus('ALL');
    setSelectedGenre('');
    setSortBy('title');
    setSearchTerm('');
    setCurrentPage(1);
  }, []);

  const handleUsernameChange = useCallback((newUsername) => {
    setUsername(newUsername);
    setCurrentPage(1);
  }, []);

  // Helper functions
  const formatDate = useCallback((date) => {
    if (!date?.year || !date?.month || !date?.day) return null;
    return `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`;
  }, []);

  // Render helpers
  const renderListItem = useCallback((entry, index) => (
    <li key={entry.media.siteUrl + index} className="anilist-list-item">
      <img
        src={entry.media.coverImage?.large || 'default-cover.jpg'}
        alt={`Cover for ${entry.media.title?.romaji || 'Untitled'}`}
        className="anilist-cover"
        loading="lazy"
      />
      <div className="anilist-details">
        <div className="entry-title">
          <h3>
            <a
              href={entry.media.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${entry.media.title.romaji} details in new tab`}
            >
              {entry.media.title.romaji}
            </a>
          </h3>
          {entry.media.title.english && (
            <p aria-hidden="true">{entry.media.title.english}</p>
          )}
        </div>
        <div className="user-stats">
          <ScoreDisplay score={entry.score || 0} />
          <ProgressDisplay
            progress={entry.progress || 0}
            chapters={entry.media.chapters || 0}
          />
        </div>
        <DateDisplay
          startedAt={entry.startedAt}
          completedAt={entry.completedAt}
          formatDate={formatDate}
        />
        <GenreDisplay genres={entry.media.genres} />
        <TagsDisplay tags={entry.media.tags || []} />
        <DescriptionDisplay description={entry.media.description} />
      </div>
    </li>
  ), [formatDate]);

  return (
    <div className="page-content" role="main" aria-label="Manga list">
      <div className="container">
        <h1 tabIndex="-1" id="main-heading">MANGA LIST</h1>
        <div className="header-wrap">
          {/* Username Section */}
          <div className='header-component'>
            <div className='component-title'>Username</div>
            <AnilistSearchBar
              value={username}
              onSearch={handleUsernameChange}
              placeholder="Enter AniList Username"
              ariaLabel="Enter AniList Username"
            />
          </div>

          {/* Search Section */}
          <div className='header-component'>
            <div className='component-title'>Search</div>
            <AnilistSearchBar
              value={searchTerm}
              onSearch={handleSearchChange}
              placeholder="Search by Title or Tag"
              ariaLabel="Search manga entries"
            />
          </div>

          {/* Filters Section */}
          <div className='header-component'>
            <div className='component-title'>Filters</div>
            <div className="filter-container" role="group" aria-labelledby="filter-controls">
              <CustomDropdown
                options={STATUS_OPTIONS}
                value={STATUS_OPTIONS.find(o => o.value === selectedStatus)}
                onChange={handleStatusChange}
                aria-label="Filter by status"
              />
              <CustomDropdown
                options={SORT_OPTIONS}
                value={SORT_OPTIONS.find(o => o.value === sortBy)}
                onChange={({ value }) => setSortBy(value)}
                aria-label="Sort entries"
              />
              <GenreFilter
                genresWithCount={genresWithCount}
                selectedGenre={selectedGenre}
                handleGenreChange={setSelectedGenre}
                loading={loading}
                aria-label="Filter by genre"
              />
              <button
                className="reset-button"
                onClick={resetFilters}
                aria-label="Reset all filters"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className='pagination-container'>
          <Pagination
            totalItems={filteredAnimeList.length}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            aria-label="Manga list pagination"
          />
        </div>

        {/* List Container */}
        <div className="anilist-list-container">
          {loading ? (
            <div role="status" aria-live="polite" aria-busy="true">
              <h3>Loading data...</h3>
            </div>
          ) : error ? (
            <div role="alert" className="error-message">
              <h3>{error}</h3>
            </div>
          ) : paginatedItems.length === 0 ? (
            <div role="status" className="empty-message">
              <h3>No results found for current filters</h3>
            </div>
          ) : (
            <ul className="anilist-list" role="list">
              {paginatedItems.map(renderListItem)}
            </ul>
          )}
        </div>

        {/* Pagination */}
        <div className='pagination-container'>
          <Pagination
            totalItems={filteredAnimeList.length}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            aria-label="Manga list pagination"
          />
        </div>
      </div>
    </div>
  );
};

// Helper functions outside component
const ANIME_LIST_QUERY = (username) => `query {
  MediaListCollection(userName: "${username}", type: MANGA) {
    lists {
      entries {
        score
        progress
        status
        media {
          coverImage { large }
          title { english romaji }
          description
          tags { name rank }
          chapters
          genres
          siteUrl
        }
        startedAt { year month day }
        completedAt { year month day }
      }
    }
  }
}`;

const processApiResponse = (response) => {
  const lists = response?.data?.data?.MediaListCollection?.lists || [];
  if (lists.length === 0) {
    throw new Error('No manga list found for this user.');
  }
  return lists.flatMap(list => list.entries);
};

const calculateGenreCounts = (entries) => {
  const genreCount = entries.reduce((acc, { media }) => {
    media.genres?.forEach(genre => acc[genre] = (acc[genre] || 0) + 1);
    return acc;
  }, {});

  return Object.entries(genreCount).map(([genre, count]) => ({ genre, count }));
};

const handleFetchError = (error, isMounted, setError) => {
  if (!isMounted || axios.isCancel(error)) return;

  console.error('Fetch error:', error);
  const errorMessage = error.response?.data?.errors?.[0]?.message ||
    'Failed to load manga list. Please check your connection and try again.';
  setError(errorMessage);
};

export default AniListComponent;