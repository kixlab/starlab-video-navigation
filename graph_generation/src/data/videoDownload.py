import os
import youtube_dl


def downloadVideo(url):

    dir_url = '/Users/sangkyung/Desktop/starlab/2level_graph/starlab-video-navigation/graph_generation/src/data/YC2Video'
    ydl_opts = {
        'ignoreerrors': True,
        'writesubtitles':False, 
        'format': '18',
        'noplaylist' : True,
        'outtmpl': os.path.join(dir_url, '%(id)s.%(ext)s'),
    }

    try:
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            ydl.cache.remove()
            info_dict = ydl.extract_info(url, download=False)
            ydl.prepare_filename(info_dict)
            ydl.download([url])
            return True
    except Exception:
        return False


if __name__ == '__main__':
    downloadVideo("https://youtu.be/ucky1nWb7LY")
