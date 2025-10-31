import java.util.List;
import java.util.Scanner;

public class MusicApp {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        MusicLibrary library = new MusicLibrary();
        User user = new User("Arun");

        library.addSong(new Song(1, "Adele", "Hello", "Pop", 300, 4.5f));
        library.addSong(new Song(2, "Ed Sheeran", "Shape of You", "Pop", 240, 4.7f));
        library.addSong(new Song(3, "Drake", "God's Plan", "Hip-Hop", 220, 4.6f));

        boolean running = true;
        while (running) {
            printMenu();
            System.out.print("Choose an option: ");
            int choice = getIntInput(sc);

            switch (choice) {
                case 1:
                    displayAllSongs(library);
                    break;
                case 2:
                    searchSongByTitle(library, sc);
                    break;
                case 3:
                    searchSongByArtist(library, sc);
                    break;
                case 4:
                    searchSongByGenre(library, sc);
                    break;
                case 5:
                    createPlaylist(user, sc);
                    break;
                case 6:
                    addSongToPlaylist(user, library, sc);
                    break;
                case 7:
                    removeSongFromPlaylist(user, library, sc);
                    break;
                case 8:
                    user.viewAllPlaylists();
                    break;
                case 9:
                    playSong(library, sc);
                    break;
                case 10:
                    viewTopSongs(library, sc);
                    break;
                case 0:
                    running = false;
                    System.out.println("Exiting MusicApp. Goodbye!");
                    break;
                default:
                    System.out.println("Invalid choice. Try again.");
            }
        }
        sc.close();
    }

    private static void printMenu() {
        System.out.println("\n=== Smart Playlist Manager ===");
        System.out.println("1. View All Songs");
        System.out.println("2. Search Song by Title");
        System.out.println("3. Search Song by Artist");
        System.out.println("4. Search Songs by Genre");
        System.out.println("5. Create Playlist");
        System.out.println("6. Add Song to Playlist");
        System.out.println("7. Remove Song from Playlist");
        System.out.println("8. View All Playlists");
        System.out.println("9. Play Song");
        System.out.println("10. View Top Songs");
        System.out.println("0. Exit");
    }

    private static int getIntInput(Scanner sc) {
        while (!sc.hasNextInt()) {
            System.out.print("Enter a valid number: ");
            sc.next();
        }
        int num = sc.nextInt();
        sc.nextLine();
        return num;
    }

    private static void displayAllSongs(MusicLibrary library) {
        List<Song> allSongs = library.getAllSongs();
        if (allSongs.isEmpty()) {
            System.out.println("No songs in the library.");
            return;
        }
        System.out.println("All Songs:");
        for (Song s : allSongs) {
            System.out.println(s);
        }
    }

    private static void searchSongByTitle(MusicLibrary library, Scanner sc) {
        System.out.print("Enter title keyword: ");
        String title = sc.nextLine();
        List<Song> results = library.searchByTitle(title);
        printSongResults(results);
    }

    private static void searchSongByArtist(MusicLibrary library, Scanner sc) {
        System.out.print("Enter artist keyword: ");
        String artist = sc.nextLine();
        List<Song> results = library.searchByArtist(artist);
        printSongResults(results);
    }

    private static void searchSongByGenre(MusicLibrary library, Scanner sc) {
        System.out.print("Enter genre: ");
        String genre = sc.nextLine();
        List<Song> results = library.getSongsByGenre(genre);
        printSongResults(results);
    }

    private static void printSongResults(List<Song> results) {
        if (results.isEmpty()) {
            System.out.println("No songs found.");
        } else {
            System.out.println("Found Songs:");
            for (Song s : results) {
                System.out.println(s);
            }
        }
    }

    private static void createPlaylist(User user, Scanner sc) {
        System.out.print("Enter playlist name: ");
        String name = sc.nextLine();
        user.createPlaylist(name);
    }

    private static void addSongToPlaylist(User user, MusicLibrary library, Scanner sc) {
        user.viewAllPlaylists();
        System.out.print("Enter playlist name: ");
        String plName = sc.nextLine();
        System.out.print("Enter song ID to add: ");
        int id = getIntInput(sc);
        Song s = library.getSongById(id);
        if (s != null) {
            user.addSongToPlaylist(plName, s);
        } else {
            System.out.println("Song with ID " + id + " not found.");
        }
    }

    private static void removeSongFromPlaylist(User user, MusicLibrary library, Scanner sc) {
        user.viewAllPlaylists();
        System.out.print("Enter playlist name: ");
        String plName = sc.nextLine();
        System.out.print("Enter song ID to remove: ");
        int id = getIntInput(sc);
        Song s = library.getSongById(id);
        if (s != null) {
            user.removeSongFromPlaylist(plName, s);
        } else {
            System.out.println("Song with ID " + id + " not found.");
        }
    }

    private static void playSong(MusicLibrary library, Scanner sc) {
        System.out.print("Enter song ID to play: ");
        int id = getIntInput(sc);
        library.playSong(id);
    }

    private static void viewTopSongs(MusicLibrary library, Scanner sc) {
        System.out.print("Enter number of top songs to view: ");
        int n = getIntInput(sc);
        List<Song> topSongs = library.getTopSongs(n);
        if (topSongs.isEmpty()) {
            System.out.println("No songs have been played yet.");
        } else {
            System.out.println("Top " + n + " Songs:");
            for (Song s : topSongs) {
                System.out.println(s+" play count = "+library.getSongPlayCount(s));
            }
        }
    }
}