import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id="4b5e303e48ae402b99cb3350155f4961",
                                                           client_secret="59acc532db204251bfb42452982299e9"))

results = sp.search(q='weezer', limit=50)
for idx, track in enumerate(results['tracks']['items']):
    print(idx, track['name'])
