import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/anilist.css';

import ScoreDisplay from './anilist/scoreDisplay';
import ProgressDisplay from './anilist/progressDisplay';
import DateDisplay from './anilist/dateDisplay';

const AniListComponent = () => {
    const [animeList, setAnimeList] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('ALL');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const itemsPerPage = 12;

    useEffect(() => {
        const savedStatus = localStorage.getItem('selectedStatus');
        if (savedStatus) setSelectedStatus(savedStatus);
    }, []);

    useEffect(() => {
        const fetchAnimeList = async () => {
            setLoading(true);
            setError(null); // Reset error state before new fetch
            try {
                const response = await axios({
                    url: 'https://graphql.anilist.co',
                    method: 'post',
                    data: {
                        query: `
                            query($status: MediaListStatus) {
                                MediaListCollection(userName: "ajisai", status: $status, type: MANGA) {
                                    lists {
                                        entries {
                                            score
                                            progress
                                            status
                                            media {
                                                title {
                                                    english
                                                    romaji
                                                }
                                                coverImage {
                                                    large
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
                            }`,
                        variables: { status: selectedStatus !== 'ALL' ? selectedStatus : undefined },
                    },
                });

                const lists = response?.data?.data?.MediaListCollection?.lists || [];
                const entries = lists.length > 0 ? lists[0].entries : [];
                setAnimeList(entries);
            } catch (error) {
                console.error('Error fetching anime list:', error);
                setError('Failed to fetch the anime list. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchAnimeList();
    }, [selectedStatus]);

    const formatDate = (date) => {
        if (!date || !date.year || !date.month || !date.day) return null;
        return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
    };

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        setSelectedStatus(newStatus);
        setCurrentPage(1); // Reset the page to 1
        localStorage.setItem('selectedStatus', newStatus);
    };

    const handlePageChange = (direction) => {
        setCurrentPage(prevPage => {
            if (direction === 'next') return Math.min(prevPage + 1, Math.ceil(animeList.length / itemsPerPage));
            if (direction === 'prev') return Math.max(prevPage - 1, 1);
            return prevPage;
        });
    };

    const handleCustomPageChange = (event) => {
        const page = parseInt(event.target.value, 10);
        if (!isNaN(page) && page >= 1 && page <= Math.ceil(animeList.length / itemsPerPage)) {
            setCurrentPage(page);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = animeList.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="anilist-list-container">
            <h2>Manga List</h2>
            
            {/* Status Filter */}
            <select onChange={handleStatusChange} value={selectedStatus}>
                <option value="ALL">All</option>
                <option value="CURRENT">Reading</option>
                <option value="PLANNING">Planning</option>
                <option value="COMPLETED">Finished</option>
                <option value="DROPPED">Dropped</option>
                <option value="PAUSED">Paused</option>
                <option value="REPEATING">Repeating</option>
            </select>

            {/* Error Message */}
            {error && <p className="error-message">{error}</p>}

            {/* Loading Spinner */}
            {loading && <p>Loading...</p>}

            {/* Anime List Grid */}
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
                                    <p>{entry.media.title.english || 'No English Title'}</p>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="genre-icon">
                                        <path d="M2 7.75C2 5.67893 3.67893 4 5.75 4H10.397C11.0325 4 11.6407 4.23705 12.092 4.65566L20.3443 11.6557C21.165 12.3605 21.184 13.6377 20.3875 14.3705L14.3875 19.8705C13.6051 20.5882 12.3517 20.5135 11.6296 19.6983L4.65566 11.592C4.23705 11.1313 4 10.5281 4 9.897V5.75C4 4.7835 4.7835 4 5.75 4H10.397H5.75ZM8 6.75C7.30964 6.75 6.75 7.30964 6.75 8C6.75 8.69036 7.30964 9.25 8 9.25C8.69036 9.25 9.25 8.69036 9.25 8C9.25 7.30964 8.69036 6.75 8 6.75Z"/>
                                    </svg>
                                    <p className="genres">
                                        <i>{entry.media.genres.length ? entry.media.genres.join(', ') : 'No genres available'}</i>
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))
                )}
            </ul>

            {/* Pagination Controls */}
            <div className="pagination-controls">
                <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage} of {Math.ceil(animeList.length / itemsPerPage)}</span>
                
                {/* Custom Page Input */}
                <input
                    type="number"
                    value={currentPage}
                    onChange={handleCustomPageChange}
                    min={1}
                    max={Math.ceil(animeList.length / itemsPerPage)}
                    className="page-input"
                />
                
                <button onClick={() => handlePageChange('next')} disabled={currentPage === Math.ceil(animeList.length / itemsPerPage)}>Next</button>
            </div>
        </div>
    );
};

export default AniListComponent;
