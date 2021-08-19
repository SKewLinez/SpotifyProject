import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id="",
                                                           client_secret=""))

results = sp.search(q='weezer', limit=50)
for idx, track in enumerate(results['tracks']['items']):
    print(idx, track['name'])
