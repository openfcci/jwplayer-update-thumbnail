import axios from 'axios'
import * as dotenv from 'dotenv'

dotenv.config()

const enableThumbnail = async (site_id, thumbnail_id) => {
  const response = axios({
    method: 'patch',
    url: `https://api.jwplayer.com/v2/sites/${site_id}/thumbnails/${thumbnail_id}/`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: process.env.JWPLAYER_SECRET,
    },
    data: { relationships: { media: [{ is_poster: true }] } },
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            status: error.response.status,
            data: error.response.data,
          },
        }
      } else {
        return 'Error', error.message
      }
    })
  return response
}

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const handler = async (event) => {
  console.log(event)
  if (event === undefined) {
    return {
      status: 401,
      message: 'malformed event',
    }
  }
  const request = await enableThumbnail(event.site_id, event.thumbnail_id)
  if (request?.status !== 'ready') {
    let response
    for (let i = 0; i < 4; i++) {
      console.log('Thumbnail processing is incomplete')
      await sleep(5000)
      const updateRequest = await enableThumbnail(
        event.site_id,
        event.thumbnail_id
      )
      if (updateRequest?.status === 'ready') {
        i = 4
        response = updateRequest
        console.log('thumbnail successfully uploaded on retry')
      } else {
        i++
      }
    }
    console.log(response)
    return response
  } else {
    console.log('Thumbnail successfully uploaded')
    console.log(request)
    return request
  }
}
