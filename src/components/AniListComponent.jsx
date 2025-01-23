import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/anilist.css';

import ScoreDisplay from '../components/anilist/scoreDisplay';

const AniListComponent = () => {
    const [animeList, setAnimeList] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('ALL');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        const savedStatus = localStorage.getItem('selectedStatus');
        if (savedStatus) {
            setSelectedStatus(savedStatus);
        }

        const fetchAnimeList = async () => {
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
                    variables: {
                        status: savedStatus || (selectedStatus !== 'ALL' ? selectedStatus : null)
                    }
                }
            });
            setAnimeList(response.data.data.MediaListCollection.lists[0].entries);
        };

        fetchAnimeList();
    }, [selectedStatus]);

    const formatDate = (date) => {
        if (!date.year || !date.month || !date.day) {
            return null;
        }
        return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
    };

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        setSelectedStatus(newStatus);
        localStorage.setItem('selectedStatus', newStatus);
    };

    const handlePageChange = (direction) => {
        setCurrentPage(prevPage => {
            if (direction === 'next') {
                return Math.min(prevPage + 1, Math.ceil(animeList.length / itemsPerPage));
            }
            if (direction === 'prev') {
                return Math.max(prevPage - 1, 1);
            }
            return prevPage;
        });
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
                <option value="DROPPED">Stopped</option>
                <option value="PAUSED">Paused</option>
                <option value="REPEATING">Re-reading</option>
            </select>

            {/* Anime List Grid */}
            <ul className="anilist-list">
                {currentItems.map((entry, index) => (
                    <li key={index} className="anilist-list-item">
                        <img src={entry.media.coverImage.large} alt={entry.media.title.romaji} className="anilist-cover" />
                        <div className="anilist-details">
                            <h3>
                                <a href={entry.media.siteUrl} target="_blank" rel="noopener noreferrer">
                                    {entry.media.title.romaji}
                                </a>
                            </h3>
                            <p>{entry.media.title.english}</p>
                            <ScoreDisplay score={entry.score} />
                            <div className="date-container">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="calendar-icon"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                                        clipRule="evenodd"
                                    />
                                </svg>

                                {entry.startedAt && formatDate(entry.startedAt) && entry.completedAt && formatDate(entry.completedAt) ? (
                                    <>
                                        <p>Started {formatDate(entry.startedAt)} to</p>
                                        <p>Finished {formatDate(entry.completedAt)}</p>
                                    </>
                                ) : entry.startedAt && formatDate(entry.startedAt) ? (
                                    <p>Started {formatDate(entry.startedAt)}</p>
                                ) : entry.completedAt && formatDate(entry.completedAt) ? (
                                    <p>Finished {formatDate(entry.completedAt)}</p>
                                ) : (
                                    <p>N/A</p>
                                )}
                            </div>
                            {/* Hide or truncate genres */}
                            <div className="genres-container">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="genre-icon"
                                >
                                    <path d="M2 7.75C2 5.67893 3.67893 4 5.75 4H10.397C11.0325 4 11.6407 4.23705 12.092 4.65566L20.3443 11.6557C21.165 12.3605 21.184 13.6377 20.3875 14.3705L14.3875 19.8705C13.6051 20.5882 12.3517 20.5135 11.6296 19.6983L4.65566 11.592C4.23705 11.1313 4 10.5281 4 9.897V5.75C4 4.7835 4.7835 4 5.75 4H10.397H5.75ZM8 6.75C7.30964 6.75 6.75 7.30964 6.75 8C6.75 8.69036 7.30964 9.25 8 9.25C8.69036 9.25 9.25 8.69036 9.25 8C9.25 7.30964 8.69036 6.75 8 6.75Z"/>
                                </svg>
                                <p className="genres">
                                    <i>{entry.media.genres.join(', ') || 'No genres available'}</i>
                                </p>
                            </div>

                        </div>
                    </li>
                ))}
            </ul>

            {/* Pagination Controls */}
            <div className="pagination-controls">
                <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage} of {Math.ceil(animeList.length / itemsPerPage)}</span>
                <button onClick={() => handlePageChange('next')} disabled={currentPage === Math.ceil(animeList.length / itemsPerPage)}>Next</button>
            </div>
        </div>
    );
};

export default AniListComponent;
