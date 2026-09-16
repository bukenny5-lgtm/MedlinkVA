# Video Hub setup

The public `/videos` page reads video metadata from Sanity. Sanity stores the title, description, category, thumbnail, provider, and publishing controls; the selected provider stores and streams the actual video.

## YouTube workflow

1. Upload the video to YouTube.
2. Copy its URL.
3. Create a Video document in Sanity.
4. Select YouTube.
5. Paste the URL into YouTube URL.
6. Add the metadata, then activate the record.

## Cloudflare Stream workflow

1. Enable Cloudflare Stream.
2. Upload the video in the Cloudflare dashboard.
3. Copy the Stream video UID.
4. Create a Video document in Sanity.
5. Select Cloudflare Stream.
6. Paste only the UID into Cloudflare Stream video UID.
7. Add a thumbnail and metadata if required.
8. Activate the record.

Cloudflare playback uses the public `iframe.videodelivery.net/<UID>` delivery URL, so no customer code or frontend environment variable is required. API tokens, account keys, and other secrets must never be stored in Sanity documents or frontend code. Direct browser uploads are intentionally not part of this phase.
