#!/usr/bin/env python3
"""
Instagram profile fetcher using Instaloader.
Returns JSON data for posts/reels from a profile.
"""

import sys
import json
import instaloader
from datetime import datetime

def fetch_profile(username, content_type='posts', limit=50, session_file=None):
    """
    Fetch posts/reels from an Instagram profile.

    Args:
        username: Instagram username (without @)
        content_type: 'posts' or 'reels'
        limit: Maximum number of items to fetch
        session_file: Path to session file for logged-in access

    Returns:
        JSON string with posts data
    """
    L = instaloader.Instaloader(
        download_pictures=False,
        download_videos=False,
        download_video_thumbnails=False,
        download_geotags=False,
        download_comments=False,
        save_metadata=False,
        compress_json=False,
        quiet=True
    )

    # Load session if provided
    if session_file:
        try:
            L.load_session_from_file(username, session_file)
        except Exception as e:
            print(json.dumps({"error": f"Failed to load session: {str(e)}"}))
            return

    try:
        profile = instaloader.Profile.from_username(L.context, username)
    except instaloader.exceptions.ProfileNotExistsException:
        print(json.dumps({"error": f"Profile '{username}' not found"}))
        return
    except instaloader.exceptions.ConnectionException as e:
        print(json.dumps({"error": f"Connection error: {str(e)}"}))
        return
    except Exception as e:
        print(json.dumps({"error": f"Error loading profile: {str(e)}"}))
        return

    videos = []
    count = 0

    try:
        # Get posts iterator
        posts = profile.get_posts()

        for post in posts:
            if count >= limit:
                break

            # Filter by content type
            if content_type == 'reels' and not post.is_video:
                continue
            if content_type == 'posts' and post.is_video:
                continue

            # Extract data
            video_data = {
                "id": post.shortcode,
                "url": f"https://www.instagram.com/p/{post.shortcode}/",
                "title": (post.caption or "")[:200] if post.caption else f"Post de @{username}",
                "thumbnail": post.url,
                "channel": f"@{username}",
                "views": (post.video_view_count or post.likes or 0) if post.is_video else (post.likes or 0),
                "likes": post.likes,
                "duration": post.video_duration if post.is_video else 0,
                "uploadDate": post.date_utc.strftime("%Y%m%d") if post.date_utc else "",
                "isVideo": post.is_video
            }

            videos.append(video_data)
            count += 1

    except instaloader.exceptions.LoginRequiredException:
        print(json.dumps({"error": "Login required. Please provide session file."}))
        return
    except instaloader.exceptions.QueryReturnedBadRequestException:
        print(json.dumps({"error": "Instagram returned bad request. Try again later or login."}))
        return
    except Exception as e:
        print(json.dumps({"error": f"Error fetching posts: {str(e)}"}))
        return

    result = {
        "username": username,
        "fullName": profile.full_name,
        "followers": profile.followers,
        "posts_count": profile.mediacount,
        "videos": videos
    }

    print(json.dumps(result))


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Usage: instagram_fetch.py <username> [content_type] [limit] [session_file]"}))
        sys.exit(1)

    username = sys.argv[1].replace('@', '')
    content_type = sys.argv[2] if len(sys.argv) > 2 else 'posts'
    limit = int(sys.argv[3]) if len(sys.argv) > 3 else 50
    session_file = sys.argv[4] if len(sys.argv) > 4 else None

    fetch_profile(username, content_type, limit, session_file)
