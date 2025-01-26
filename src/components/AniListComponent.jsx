import React, { useEffect, useState, useMemo, useCallback } from 'react';
import '../styles/anilist.css';
import axios from 'axios';

// Components
import Pagination from './anilist/paginationWrapper.jsx';
import ScoreDisplay from './anilist/scoreDisplay';
import ProgressDisplay from './anilist/progressDisplay';
import DateDisplay from './anilist/dateDisplay';
import GenreDisplay from './anilist/genreDisplay.jsx';
import TagsDisplay from './anilist/tagsDisplay.jsx';
import GenreFilter from './anilist/genreFilter.jsx';
import SearchBar from './customSearchBar.jsx';
import CustomDropdown from '../components/customDropdown.jsx';

const AniListComponent = () => {
  const [animeList, setAnimeList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('title');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [genresWithCount, setGenresWithCount] = useState([]);

  const itemsPerPage = 12;

  useEffect(() => {
    const savedStatus = localStorage.getItem('selectedStatus');
    if (savedStatus) setSelectedStatus(savedStatus);
  }, []);

  // Fetch Entry List
  useEffect(() => {
    const source = axios.CancelToken.source();
    let isMounted = true; // Track if the component is mounted

    const fetchAnimeList = async () => {
      if (!isMounted) return; // Exit if the component is unmounted

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
          throw new Error('Failed to fetch data from AniList API');
        }

        const lists = response?.data?.data?.MediaListCollection?.lists || [];
        const entries = lists.flatMap((list) => list.entries);

        if (isMounted) {
          // Update anime list state
          setAnimeList(entries);

          // Calculate genre counts
          const genreCount = {};
          entries.forEach((entry) => {
            if (entry.media?.genres) {
              entry.media.genres.forEach((genre) => {
                genreCount[genre] = (genreCount[genre] || 0) + 1;
              });
            }
          });

          // Convert genre counts to an array of objects
          const genresWithCount = Object.keys(genreCount).map((genre) => ({
            genre,
            count: genreCount[genre],
          }));

          // Update genres with count state
          setGenresWithCount(genresWithCount);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else if (isMounted) {
          console.error('Error fetching anime list:', error);
          setError(
            error.response?.data?.errors?.[0]?.message ||
            'Failed to fetch the anime list. Please try again later.'
          );
          setGenresWithCount([]);

          // Retry fetching data after a delay
          const retryFetch = async (retries = 3, delay = 1000) => {
            if (retries > 0 && isMounted) {
              setTimeout(() => {
                console.log(`Retrying fetch... Attempts left: ${retries}`);
                fetchAnimeList();
              }, delay);
            } else if (isMounted) {
              setError('Failed to fetch data after multiple attempts.');
            }
          };

          retryFetch();
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Fetch the anime list
    fetchAnimeList();

    // Cleanup function to cancel the request if the component unmounts
    return () => {
      isMounted = false; // Mark the component as unmounted
      if (source) {
        source.cancel('Component unmounted, request canceled');
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleSearchChange = useCallback((query) => {
    console.log('Search term updated:', query); // Debugging: Check if this logs as you type
    setSearchTerm(query);
    setCurrentPage(1); // Reset to the first page when searching
  }, []);

  const formatDate = useCallback((date) => {
    if (!date || !date.year || !date.month || !date.day) return null;
    return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
  }, []);

  const handleStatusChange = useCallback((selectedOption) => {
    const newStatus = selectedOption.value;
    setSelectedStatus(newStatus);
    setCurrentPage(1);
    localStorage.setItem('selectedStatus', newStatus);
  }, []);

  const handleGenreChange = useCallback((selectedOption) => {
    setSelectedGenre(selectedOption ? selectedOption.value : '');
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((selectedOption) => {
    setSortBy(selectedOption.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchTerm(''); // Clear search term
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedStatus('ALL');
    setSelectedGenre('');
    setSortBy('title');
    handleClearSearch(); // Clear search term
    setCurrentPage(1);
  }, [handleClearSearch]);

  const filteredAnimeList = useMemo(() => {
    console.log('Filtering anime list with search term:', searchTerm); // Debugging: Check if this logs as you type
    return animeList.filter((entry) => {
      const matchStatus = selectedStatus === 'ALL' || entry.status === selectedStatus;
      const matchGenre = selectedGenre === '' || entry.media.genres.includes(selectedGenre);
      const searchTermLower = searchTerm.toLowerCase();
      const titleMatch =
        (entry.media.title.romaji || '').toLowerCase().includes(searchTermLower) ||
        (entry.media.title.english || '').toLowerCase().includes(searchTermLower);
      const tagMatch = entry.media.tags.some((tag) => tag.name.toLowerCase().includes(searchTermLower));
      return matchStatus && matchGenre && (titleMatch || tagMatch);
    });
  }, [animeList, selectedStatus, selectedGenre, searchTerm]);

  const sortedAnimeList = useMemo(() => {
    return [...filteredAnimeList].sort((a, b) => {
      if (sortBy === 'title') {
        return a.media.title.romaji.localeCompare(b.media.title.romaji);
      } else if (sortBy === 'score') {
        return b.score - a.score;
      } else if (sortBy === 'progress') {
        return b.progress - a.progress;
      }
      return 0;
    });
  }, [filteredAnimeList, sortBy]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedAnimeList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="page-content">
      <div className="container">
        <h3>MANGA LIST</h3>
        <div className="header-wrap">
          <div className="search-container">
            <SearchBar
              value={searchTerm} // Pass search term state
              onSearch={handleSearchChange} // Pass search handler
              placeholder="Search by Title or Tag"
              context="parameters"
            />
          </div>
          <div className="filter-container">
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
              value={{ value: selectedStatus, label: selectedStatus }}
              onChange={handleStatusChange}
              placeholder="-"
            />
            <CustomDropdown
              options={[
                { value: 'title', label: 'Sort by Title' },
                { value: 'score', label: 'Sort by Score' },
                { value: 'progress', label: 'Sort by Progress' },
              ]}
              value={{ value: sortBy, label: `Sort by ${sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}` }}
              onChange={handleSortChange}
              placeholder="Sort By"
            />
            <div>
              {loading ? (
                <div className="loading-text">Loading genres...</div>
              ) : (
                <GenreFilter
                  genresWithCount={genresWithCount || []}
                  selectedGenre={selectedGenre}
                  handleGenreChange={handleGenreChange}
                  handleMenuClose={() => setSelectedGenre('')}
                  handleBlur={() => setSelectedGenre('')}
                />
              )}
            </div>
            <button className="reset-button" onClick={resetFilters}>
              Reset
            </button>
          </div>
        </div>
        <div className="pagination-container">
          <Pagination
            filteredAnimeList={filteredAnimeList}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className="anilist-list-container">
          <ul className="anilist-list">
            {loading ? (
              <div className="message">
                <h3>Loading data...</h3>
              </div>
            ) : currentItems.length === 0 ? (
              <div className="message">
                <h3>No data available for the selected filters.</h3>
              </div>
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
                    <div className="user-stats">
                      <ScoreDisplay score={entry.score || 0} />
                      <ProgressDisplay progress={entry.progress || 0} chapters={entry.media.chapters || 0} />
                    </div>
                    <div className="date-container">
                      <DateDisplay
                        startedAt={entry.startedAt}
                        completedAt={entry.completedAt}
                        formatDate={formatDate}
                      />
                    </div>
                    <div className="genres-container">
                      <GenreDisplay genres={entry.media.genres} />
                    </div>
                    <div className="tags-container">
                      <TagsDisplay tags={entry.media.tags || []} />
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
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