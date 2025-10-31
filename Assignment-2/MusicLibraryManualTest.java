public class MusicLibraryManualTest {

    MusicLibrary library = new MusicLibrary();
    User user = new User("Arun");

    // Test 1: Adding Songs
    public boolean testAddSongs() {
        Song s1 = new Song(1, "Ed Sheeran", "Shape of You", "Pop", 240, 4.7f);
        Song s2 = new Song(2, "Alan Walker", "Faded", "EDM", 210, 4.5f);
        Song s3 = new Song(3, "The Weeknd", "Blinding Lights", "Pop", 200, 4.9f);
        Song s4 = new Song(4, "Imagine Dragons", "Believer", "Rock", 230, 4.8f);

        library.addSong(s1);
        library.addSong(s2);
        library.addSong(s3);
        library.addSong(s4);

        return library.getAllSongs().size() == 4;
    }

    // Test 2: Removing a Song
    public boolean testRemoveSong() {
        library.removeSong(2);
        return library.getSongById(2) == null;
    }

    // Test 3: Search by Title
    public boolean testSearchByTitle() {
        return !library.searchByTitle("Shape").isEmpty();
    }

    // Test 4: Play Song & Top Songs
    public boolean testPlayAndTopSongs() {
        library.playSong(4);
        library.playSong(4);
        Song topSong = library.getTopSongs(1).get(0);
        return topSong.getId() == 4;
    }

    // Test 5: Playlist Creation & Add Song
    public boolean testPlaylistCreationAndAddSong() {
        user.createPlaylist("Favorites");
        Song song = library.getSongById(1);
        user.addSongToPlaylist("Favorites", song);
        Playlist fav = user.getPlaylistByName("Favorites");
        return fav != null && fav.getSongs().size() == 1;
    }

    // Test 6: Remove Song from Playlist
    public boolean testRemoveSongFromPlaylist() {
        user.createPlaylist("Workout");
        Song song = library.getSongById(3);
        user.addSongToPlaylist("Workout", song);
        user.removeSongFromPlaylist("Workout", song);
        Playlist workout = user.getPlaylistByName("Workout");
        return workout != null && workout.getSongs().isEmpty();
    }

    public static void main(String[] args) {
        MusicLibraryManualTest test = new MusicLibraryManualTest();

        System.out.println("=== Music Library Manual Tests ===\n");

        if (test.testAddSongs())
            System.out.println("[PASS] Song Added Successfully");
        else
            System.out.println("[FAIL] Song Adding Failed");

        if (test.testRemoveSong())
            System.out.println("[PASS] Song Removed Successfully");
        else
            System.out.println("[FAIL] Song Removal Failed");

        if (test.testSearchByTitle())
            System.out.println("[PASS] Search By Title Works");
        else
            System.out.println("[FAIL] Search By Title Failed");

        if (test.testPlayAndTopSongs())
            System.out.println("[PASS] Play Count & Top Songs Working");
        else
            System.out.println("[FAIL] Play Count or Top Songs Not Working");

        if (test.testPlaylistCreationAndAddSong())
            System.out.println("[PASS] Playlist Creation & Add Song Works");
        else
            System.out.println("[FAIL] Playlist Creation or Add Song Failed");

        if (test.testRemoveSongFromPlaylist())
            System.out.println("[PASS] Remove Song From Playlist Works");
        else
            System.out.println("[FAIL] Remove Song From Playlist Failed");

        System.out.println("\n=== All Manual Tests Completed ===");
    }
}
