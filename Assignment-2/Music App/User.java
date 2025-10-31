import java.util.HashSet;

public class User {
    private String userName;
    private HashSet<Playlist> playlistSet = new HashSet<>();

    public User(String userName) {
        this.userName = userName;
    }

    public Playlist getPlaylistByName(String name) {
        for (Playlist p : playlistSet) {
            if (p.getName().equalsIgnoreCase(name)) {
                return p; 
            }
        }
        return null;
    }

    public void createPlaylist(String name) {
        if (getPlaylistByName(name) != null) {
            System.out.println("Playlist already exists");
        } else {
            Playlist playlist = new Playlist(name);
            playlistSet.add(playlist);
            System.out.println("Playlist created: " + name);
        }
    }

    public void addSongToPlaylist(String playlistName,Song song) {
        Playlist p = getPlaylistByName(playlistName);
        if (p != null) {
            p.addSong(song);
            System.out.println("Song added to " + playlistName);
        } else {
            System.out.println("Playlist not found");
        }
    }

    public void removeSongFromPlaylist(String playlistName,Song song) {
        Playlist p = getPlaylistByName(playlistName);
        if(p != null) {
            p.removeSongById(song.getId());
            System.out.println("Song removed from " + playlistName);
        } else {
            System.out.println("Playlist not found");
        }
    }

    public void viewAllPlaylists() {
        if (playlistSet.isEmpty()) {
            System.out.println("No playlists available.");
        } else {
            for (Playlist p : playlistSet) {
                System.out.println(p.getName() + " (" + p.getSongs().size() + " songs)");
            }
        }
    }
}