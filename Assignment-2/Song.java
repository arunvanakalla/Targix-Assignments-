public class Song {
    private int id;
    private String artist;
    private String title;
    private String genre;
    private int duration;
    private float rating;

    Song(int id,String artist,String title,String genre,int duration,float rating) {
        this.id = id;
        this.artist = artist;
        this.title = title;
        this.genre = genre;
        this.duration = duration;
        this.rating = rating;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }


    public int getId() {
        return id;
    }

    public String getArtist() {
        return artist;
    }

    public String getTitle() {
        return title;
    }

    public String getGenre() {
        return genre;
    }

    public int getDuration() {
        return duration;
    }

    public float getRating() {
        return rating;
    }

    @Override
    public String toString() {
        return "Song[" + id + "] " + title + " - " + artist + " (" + genre + ") "
           + duration + "s rating=" + rating;
    }
}