import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import '../styles/anilist.css';

// AniList-specific components
import Pagination from './anilist/paginationWrapper.jsx';
import ScoreDisplay from './anilist/scoreDisplay';
import ProgressDisplay from './anilist/progressDisplay';
import DateDisplay from './anilist/dateDisplay';
import GenreDisplay from './anilist/genreDisplay.jsx';
import TagsDisplay from './anilist/tagsDisplay.jsx';
import GenreFilter from './anilist/genreFilter.jsx';

// Global components
import SearchBar from './customSearchBar.jsx';
import CustomDropdown from '../components/customDropdown.jsx';
import ResetFilterButton from '../components/anilist/resetFilter.jsx';

const AniListComponent = () => {
  const [animeList, setAnimeList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('title');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 12;
  const [genresWithCount, setGenresWithCount] = useState([]);

  // Fetch the selected status from localStorage
  useEffect(() => {
    const savedStatus = localStorage.getItem('selectedStatus');
    if (savedStatus) setSelectedStatus(savedStatus);
  }, []);

  // Fetch anime list
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchAnimeList = async () => {
      setLoading(true);
      setError(null);

      try {
        const query = `
          query {
            MediaListCollection(userName: "ajisai", type: MANGA) {
              lists {
                entries {
                  score
                  progress
                  status
                  media {
                    coverImage {
                      large
                    }
                    title {
                      english
                      romaji
                    }
                    tags {
                      name
                      rank
                    }
                    chapters
                    genres
                    siteUrl
                  }
                  startedAt {
                    year
                    month
                    day
                  }
                  completedAt {
                    year
                    month
                    day
                  }
                }
              }
            }
          }
        `;

        const response = await axios({
          url: 'https://graphql.anilist.co',
          method: 'post',
          data: { query },
          cancelToken: source.token,
          timeout: 10000,
        });

        if (!response || !response.data || response.data.errors) {
          throw new Error('Failed to fetch data');
        }

        const lists = response?.data?.data?.MediaListCollection?.lists || [];
        const entries = lists.flatMap((list) => list.entries);

        setAnimeList(entries);

        // Calculate the count of entries per genre
        const genreCount = {};
        entries.forEach((entry) => {
          if (entry.media?.genres) {
            entry.media.genres.forEach((genre) => {
              genreCount[genre] = (genreCount[genre] || 0) + 1;
            });
          }
        });

        // Convert genreCount to an array of objects
        const genresWithCount = Object.keys(genreCount).map((genre) => ({
          genre,
          count: genreCount[genre],
        }));

        setGenresWithCount(genresWithCount);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.error('Error fetching anime list:', error);
          setError('Failed to fetch the anime list. Please try again later.');
          setGenresWithCount([]); // Ensure genresWithCount is an empty array on error
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeList();

    return () => {
      if (source) {
        source.cancel('Component unmounted, request canceled');
      }
    };
  }, []);

  // Format date helper function
  const formatDate = (date) => {
    if (!date || !date.year || !date.month || !date.day) return null;
    return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
  };

  // Handle the status change and save it to localStorage
  const handleStatusChange = (selectedOption) => {
    const newStatus = selectedOption.value;
    setSelectedStatus(newStatus);
    setCurrentPage(1); // Reset the page to 1
    localStorage.setItem('selectedStatus', newStatus);
  };

  // Handle the genre change
  const handleGenreChange = (selectedOption) => {
    setSelectedGenre(selectedOption ? selectedOption.value : ''); // Ensure value is set correctly
    setCurrentPage(1); // Reset the page to 1
  };

  // Handle the sort change
  const handleSortChange = (selectedOption) => {
    setSortBy(selectedOption.value);
  };

  // Sort the anime list based on the selected sort criteria
  const sortAnimeList = (list) => {
    return [...list].sort((a, b) => {
      if (sortBy === 'title') {
        const titleA = a.media.title.romaji.toLowerCase();
        const titleB = b.media.title.romaji.toLowerCase();
        return titleA.localeCompare(titleB);
      } else if (sortBy === 'score') {
        return b.score - a.score;
      } else if (sortBy === 'progress') {
        return b.progress - a.progress;
      }
      return 0;
    });
  };

  // Handle page change (next/previous)
  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      const maxPage = Math.ceil(filteredAnimeList.length / itemsPerPage);
      if (direction === 'next') return Math.min(prevPage + 1, maxPage);
      if (direction === 'prev') return Math.max(prevPage - 1, 1);
      if (direction === 'go') return currentPage; // Use the current page for the 'Go' button
      return prevPage;
    });
  };

  // Handle custom page input change
  const handleCustomPageChange = (event) => {
    const page = parseInt(event.target.value, 10);
    const maxPage = Math.ceil(filteredAnimeList.length / itemsPerPage);
    if (!isNaN(page) && page >= 1 && page <= maxPage) {
      setCurrentPage(page);
    }
  };

  // Handle the search term change
  const handleSearchChange = (query) => {
    setSearchTerm(query);
  };

  // Filter the anime list based on the search term, selected status, and selected genre
  const filteredAnimeList = useMemo(() => {
    return animeList.filter((entry) => {
      const matchStatus = selectedStatus === 'ALL' || entry.status === selectedStatus;
      const matchGenre = selectedGenre === '' || entry.media.genres.includes(selectedGenre);
      const title = (entry.media.title.romaji || '').toLowerCase();
      const englishTitle = (entry.media.title.english || '').toLowerCase();
      const matchSearchTerm = title.includes(searchTerm) || englishTitle.includes(searchTerm);
      return matchStatus && matchGenre && matchSearchTerm;
    });
  }, [animeList, selectedStatus, selectedGenre, searchTerm]);

  // Sort the filtered anime list
  const sortedAnimeList = useMemo(() => sortAnimeList(filteredAnimeList), [filteredAnimeList, sortBy]);

  // Paginate the sorted anime list
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedAnimeList.slice(startIndex, startIndex + itemsPerPage);

  // Debugging log
  console.log('genresWithCount in AniListComponent:', genresWithCount);

  // Handle menu close for genre filter
  const handleMenuClose = () => {
    if (!selectedGenre) {
      setSelectedGenre(''); // Reset genre to default when menu closes
    }
  };

  // Handle blur for genre filter
  const handleBlur = () => {
    if (!selectedGenre) {
      setSelectedGenre('');
    }
  };

  // Reset filters function
  const resetFilters = () => {
    setSelectedStatus('ALL');
    setSelectedGenre('');
    setSortBy('title');
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <div className="page-content">
      <div className="container">
        <h3>MANGA LIST</h3>
        <div className="header-wrap">
          <div className="search-container">
            <SearchBar
              onSearch={handleSearchChange}
              placeholder="Search by Title"
              context="parameters"
            />
          </div>

            {/* Filters */}
            <div className="filter-container">
              {/* Status Dropdown */}
              <CustomDropdown
                options={[
                  { value: 'ALL', label: 'All' },
                  { value: 'CURRENT', label: 'Reading' },
                  { value: 'PLANNING', label: 'Planning' },
                  { value: 'COMPLETED', label: 'Finished' },
                  { value: 'DROPPED', label: 'Dropped' },
                  { value: 'PAUSED', label: 'Paused' },
                  { value: 'REPEATING', label: 'Repeating' },
                ]}
                placeholder="Select Status"
                onChange={handleStatusChange}
                value={selectedStatus}
              />

              {/* Sort Dropdown */}
              <CustomDropdown
                options={[
                  { value: 'title', label: 'Sort by Title' },
                  { value: 'score', label: 'Sort by Score' },
                  { value: 'progress', label: 'Sort by Progress' },
                ]}
                placeholder="Sort By"
                onChange={handleSortChange}
                value={sortBy}
              />

              {/* Genre Filter */}
              <div>
                {loading ? (
                  <div className="loading-text">Loading genres...</div>
                ) : (
                  <GenreFilter
                    genresWithCount={genresWithCount || []} // Ensure it defaults to an empty array
                    selectedGenre={selectedGenre}
                    handleGenreChange={handleGenreChange}
                    handleMenuClose={handleMenuClose}
                    handleBlur={handleBlur}
                  />
                )}
              </div>

              {/* Reset Filters Button */}
              <button
                className="reset-button"
                onClick={resetFilters}
              >
                Reset
              </button>
            </div>
          </div>
        {/* Pagination Controls */}
        <div className="pagination-container">
          <Pagination
            filteredAnimeList={filteredAnimeList}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>

        {/* Anime List Grid */}
<div className="anilist-list-container">
  <ul className="anilist-list">
    {currentItems.length === 0 && !loading && !error ? (
      <p>No data available for the selected status.</p>
    ) : (
      currentItems.map((entry, index) => (
        <li key={index} className="anilist-list-item">
          <img src={entry.media.coverImage.large} alt={entry.media.title.romaji} className="anilist-cover" />
          <div className="anilist-details">
            <div className="entry-title">
              <h3>
                <a href={entry.media.siteUrl} target="_blank" rel="noopener noreferrer">
                  {entry.media.title.romaji}
                </a>
              </h3>
              <p>{entry.media.title.english || ' '}</p>
            </div>

            {/* User Stats */}
            <div className="user-stats">
              <ScoreDisplay score={entry.score || 0} />
              <ProgressDisplay
                progress={entry.progress || 0}
                chapters={entry.media.chapters || 0}
              />
            </div>

            {/* Date Container */}
            <div className="date-container">
              <DateDisplay
                startedAt={entry.startedAt}
                completedAt={entry.completedAt}
                formatDate={formatDate}
              />
            </div>

            {/* Genres */}
            <div className="genres-container">
              <GenreDisplay genres={entry.media.genres} />
            </div>

            {/* Tags */}
            <div className="tags-container">
              <TagsDisplay tags={entry.media.tags || []} />
            </div>
          </div>
        </li>
      ))
    )}
  </ul>
</div>

        {/* Pagination Controls */}
        <div className="pagination-container">
          <Pagination
            filteredAnimeList={filteredAnimeList}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AniListComponent;