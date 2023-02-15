import * as React from 'react';
import { renderToString } from 'react-dom/server';
import router from '@sitevision/api/common/router';
import appData from '@sitevision/api/server/appData';
import requester from "@sitevision/api/server/Requester";
import properties from '@sitevision/api/server/Properties';
import App from './components/App';

router.get('/', (req, res) => {
  let dataObj = [];
  const ARCHIVE_ID = appData.get("archive");
  const BASE_URI = appData.get("archive", "URI");
  const BASE_URL = appData.get("archive", "URL").replace(BASE_URI, "");
  const API_URL = `${BASE_URL}/rest-api/1/1/${ARCHIVE_ID}/nodes`;
  const quantity = parseInt(appData.get("quantity"));
  
  requester
    .get(API_URL, {
      data: { textPortletFormat: "JSON" },
    })
    .done((result, statusCode) => {
      // GET succeeded, handle potential JSON response result appropriately
      if (statusCode === 200) {
        for (let i = 0; i < result.length; i++) {
          const NODE_ID = result[i].id;
          let articleData = properties.get(
            NODE_ID,
            'URL',
            'SV.Title',
            'SV.Description',
            'SV.Content',
            'SV.Image'
          );
          // Image 
          const IMG_ID = properties.get(NODE_ID, 'SV.Image');
          const IMG_URL = properties.get(IMG_ID, 'URL');
          articleData = { ...articleData, NODE_ID, IMG_URL };
          dataObj.push(articleData);
        }

        const data = { dataObj,  quantity};
        const html = renderToString(<App {...data} />);
        res.agnosticRender(html, data);
      } else {
      console.log('Error')
    }
  })
  .fail((message) => {
    // GET failed, handle appropriately
    console.log('Failed: ', message)
  });
});
