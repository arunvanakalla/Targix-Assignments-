import java.util.*;

public class Playlist {
    private String name;
    private List<Song> songs = new ArrayList<>();

    Playlist(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void addSong(Song song) {
        songs.add(song);
    }

    public void removeSongById(int id) {
        for (int i = 0; i < songs.size(); i++) {
            if (songs.get(i).getId() == id) {
                songs.remove(i);
                System.out.println("Song removed from playlist.");
                return;
            }
        }
        System.out.println("No song with that id in the playlist.");
    }

    public List<Song> getSongs() {
        if (songs.isEmpty()) {
            System.out.println("Playlist is empty.");
            return Collections.emptyList();
        }
        return songs;
    }

}
