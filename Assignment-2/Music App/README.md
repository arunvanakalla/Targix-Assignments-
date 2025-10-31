# 🎵 Smart Playlist Manager

A Java-based console application for managing a music library with intelligent playlist features. This application allows users to organize songs, create playlists, track play counts, and discover top songs based on listening history.

## ✨ Features

- **Music Library Management**
  - Add songs with details (ID, artist, title, genre, duration, rating)
  - Remove songs from the library
  - View all songs in the library
  - Prevent duplicate song IDs

- **Advanced Search**
  - Search songs by title (partial match)
  - Search songs by artist (partial match)
  - Filter songs by genre

- **Playlist Management**
  - Create custom playlists
  - Add songs to playlists
  - Remove songs from playlists
  - View all playlists with song counts

- **Smart Features**
  - Track song play counts
  - View top N most played songs
  - Play song simulation with automatic tracking

## 🛠️ Technologies Used

- **Language**: Java
- **Data Structures**: 
  - `ArrayList` - For storing songs and playlists
  - `HashMap` - For genre mapping and play count tracking
  - `HashSet` - For unique artists and song IDs
  - `PriorityQueue` - For sorting top songs by play count

## 📁 Project Structure

```
week 2 Assignment/
│
├── Song.java                    # Song entity class with attributes
├── MusicLibrary.java            # Core library management with search
├── Playlist.java                # Playlist entity and operations
├── User.java                    # User management and playlist handling
├── MusicApp.java                # Main application with CLI menu
└── MusicLibraryManualTest.java  # Test suite for functionality
```

### Class Overview

| Class | Description |
|-------|-------------|
| `Song.java` | Represents a song with ID, artist, title, genre, duration, and rating |
| `MusicLibrary.java` | Manages the song collection with add/remove/search operations |
| `Playlist.java` | Represents a playlist containing multiple songs |
| `User.java` | Manages user playlists and user-specific operations |
| `MusicApp.java` | Main application entry point with interactive menu |
| `MusicLibraryManualTest.java` | Comprehensive test cases for all features |

## 🚀 How to Run

### Prerequisites
- Java Development Kit (JDK) 8 or higher
- Command line / Terminal

### Compilation

```bash
javac *.java
```

### Run the Application

```bash
java MusicApp
```

### Run Tests

```bash
java MusicLibraryManualTest
```

## 📖 Usage Guide

When you run the application, you'll see an interactive menu:

```
=== Smart Playlist Manager ===
1. View All Songs
2. Search Song by Title
3. Search Song by Artist
4. Search Songs by Genre
5. Create Playlist
6. Add Song to Playlist
7. Remove Song from Playlist
8. View All Playlists
9. Play Song
10. View Top Songs
0. Exit
```

### Sample Workflow

1. **View Available Songs** - Option 1 displays all songs in the library
2. **Create a Playlist** - Option 5 to create a new playlist (e.g., "Favorites")
3. **Add Songs to Playlist** - Option 6 to add songs by ID
4. **Play Songs** - Option 9 to play and track song plays
5. **View Top Songs** - Option 10 to see most played songs

### Pre-loaded Sample Data

The application comes with 3 sample songs:
- Song 1: "Hello" by Adele (Pop, 300s, 4.5★)
- Song 2: "Shape of You" by Ed Sheeran (Pop, 240s, 4.7★)
- Song 3: "God's Plan" by Drake (Hip-Hop, 220s, 4.6★)

## 🧪 Testing

The project includes a comprehensive test suite (`MusicLibraryManualTest.java`) that covers:

- ✅ Adding songs to library
- ✅ Removing songs from library
- ✅ Searching by title
- ✅ Play count and top songs functionality
- ✅ Playlist creation and song addition
- ✅ Removing songs from playlists

**Run tests to verify all features:**
```bash
java MusicLibraryManualTest
```

Expected output shows `[PASS]` for all test cases.

## 🎯 Key Features Explained

### Search Functionality
- **Case-insensitive** partial matching
- Search across title, artist, or genre
- Returns all matching results

### Play Count Tracking
- Automatically tracks each time a song is played
- Uses `HashMap` for O(1) play count updates
- Priority queue for efficient top-N retrieval

### Playlist System
- User can create multiple playlists
- Each playlist stores references to songs
- Prevents duplicate playlist names

## 🔮 Future Enhancements

- [ ] Add GUI interface (JavaFX/Swing)
- [ ] Implement file persistence (save/load library)
- [ ] Add shuffle and repeat modes
- [ ] Integration with audio file playback
- [ ] User authentication and multiple user support
- [ ] Export playlists to file
- [ ] Advanced sorting options (by rating, duration, etc.)
- [ ] Song recommendations based on listening history

## 👤 Author

This project was created as part of Week 2 Assignment for Targix.

## 📄 License

This project is open source and available for educational purposes.

---

**Note**: This is a console-based application designed for learning Java data structures and OOP concepts. For actual music playback, additional libraries and audio file integration would be required.

