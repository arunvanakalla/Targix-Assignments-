import java.util.*;

public class MusicLibrary {
    private List<Song> allSongs = new ArrayList<>();
    private Set<String> uniqueArtists = new HashSet<>();
    private Map<String, List<Song>> genreToSongs = new HashMap<>();
    private Set<Integer> songIds = new HashSet<>();
    private Map<Integer, Integer> songPlayCounts = new HashMap<>();

    public Song getSongById(int id) {
        for(Song song : allSongs) {
            if(song.getId() == id) {
                return song;
            }
        }
        return null;
    }

    public boolean addSong(Song s) {
        int id = s.getId();
        if(!songIds.contains(id)) {
            String genre = s.getGenre();
            String artist = s.getArtist();
            songIds.add(id);
            uniqueArtists.add(artist);
            allSongs.add(s);
            if(genreToSongs.containsKey(genre)) {
                List<Song> songs = genreToSongs.get(genre);
                songs.add(s);
                genreToSongs.put(genre , songs);
            } else {
                List<Song> songs = new ArrayList<>();
                songs.add(s);
                genreToSongs.put(genre , songs);
            }
            String name = s.getTitle();
            songPlayCounts.put(id , 0);
            return true;
        }
        System.out.println("Song with ID " + id + " already exists!");
        return false;
    }

    public boolean removeSong(int songId) {
        Song songToRemove = null;
        for (Song s : allSongs) {
            if (s.getId() == songId) {
                songToRemove = s;
                break;
            }
        }
        if (songToRemove == null) {
            System.out.println("Song with ID " + songId + " not found!");
            return false;
        }

        allSongs.remove(songToRemove);
        songIds.remove(songId);

        String genre = songToRemove.getGenre();
        List<Song> genreSongs = genreToSongs.get(genre);
        if (genreSongs != null) {
            genreSongs.remove(songToRemove);
            if (genreSongs.isEmpty()) {
                genreToSongs.remove(genre);
            }
        }

        String artist = songToRemove.getArtist();
        boolean artistStillExists = false;
        for (Song s : allSongs) {
            if (s.getArtist().equalsIgnoreCase(artist)) {
                artistStillExists = true;
                break;
            }
        }
        if (!artistStillExists) {
            uniqueArtists.remove(artist);
        }

        songPlayCounts.remove(songId);

        System.out.println("Song with ID " + songId + " removed successfully.");
        return true;
    }

    public List<Song> searchByTitle(String title) {
        List<Song> songs = new ArrayList<>();
        String search = title.toLowerCase();
        for (Song s : allSongs) {
            if (s.getTitle().toLowerCase().contains(search)) {
                songs.add(s);
            }
        }
        return songs;
    }

    public List<Song> searchByArtist(String artist) {
        List<Song> songs = new ArrayList<>();
        String search = artist.toLowerCase();
        for (Song s : allSongs) {
            if (s.getArtist().toLowerCase().contains(search)) {
                songs.add(s);
            }
        }
        return songs;
    }

    public List<Song> getSongsByGenre(String genre) {
        for (String key : genreToSongs.keySet()) {
            if (key.equalsIgnoreCase(genre)) {
                return genreToSongs.get(key);
            }
        }
        return new ArrayList<>();
    }

    public boolean playSong(int songId) {
        if(songPlayCounts.containsKey(songId)) {
            songPlayCounts.put(songId, songPlayCounts.get(songId) + 1);

            for (Song s : allSongs) {
                if (s.getId() == songId) {
                    System.out.println("Playing: " + s);
                    break;
                }
            }
            return true;
        }
        System.out.println("Song with ID " + songId + " not found!");
        return false;
    }

    public List<Song> getTopSongs(int limit) {
        PriorityQueue<Song> pq = new PriorityQueue<>(
            (a, b) -> songPlayCounts.get(b.getId()) - songPlayCounts.get(a.getId())
        );
        pq.addAll(allSongs);
        List<Song> topSongs = new ArrayList<>();
        for (int i = 0; i < limit && !pq.isEmpty(); i++) {
            topSongs.add(pq.poll());
        }
        return topSongs;
    }

    public List<Song> getAllSongs() {
        return allSongs;
    }

    public int getSongPlayCount(Song song) {
        if(songPlayCounts.containsKey(song.getId())) {
            return songPlayCounts.get(song.getId());
        }
        return -1;
    }
}