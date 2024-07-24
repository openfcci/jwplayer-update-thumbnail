# jwplayer-update-thumbnail

## AWS Lambda and Gateway

[jwplayer-update-thumbnail lambda](https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2#/functions/jwplayer-update-thumbnail?tab=code)

[jwplayer-update-thumbnail gateway](https://us-west-2.console.aws.amazon.com/apigateway/main/apis/zcswehonfl/resources?api=zcswehonfl&region=us-west-2&resourceID=f6fb53ej77:POST)

https://zcswehonfl.execute-api.us-west-2.amazonaws.com/prod/

POST Request

```
{
    site_id: 'l0XScfRd',
    thumbnail_id: 'n9nlPu7b'
}
```

## Description

Enables thumbnails for a live event in WDAY+. Thumbnail ID's are generated in the jwplayer-create-thumbnail lambda and sent here for processing.

Thumbnails are enabled by calling the [JW Player Update Thumbnail Endpoint](https://docs.jwplayer.com/platform/reference/patch_v2-sites-site-id-thumbnails-thumbnail-id). Sometimes the the thumbnail image is still processing when uploaded so we take five seconds (5000ms) between api calls to account for this. We try to enable a total of four times before abandoning the enable process.
