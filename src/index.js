import * as React from 'react';
import { renderToString } from 'react-dom/server';
import router from '@sitevision/api/common/router';
import appData from '@sitevision/api/server/appData';
import properties from '@sitevision/api/server/Properties';
import restApi from "@sitevision/api/server/RestApi";

import App from './components/App';

router.get('/', (req, res) => {
  let articles = [];
  const archive = appData.getNode("archive");
  const quantity = parseInt(appData.get("quantity"));
  const dataObj = restApi.get(archive, "nodes", { limit: quantity }).body;

  for (let i = 0; i < dataObj.length; i++) {
    const NODE_ID = dataObj[i].id;
    let articleData = properties.get(
      NODE_ID,
      "URL",
      "SV.Title",
      "SV.Description",
      "SV.Content",
      "SV.Image"
    );
    // Image
    const IMG_ID = properties.get(NODE_ID, "SV.Image");
    const IMG_URL = properties.get(IMG_ID, "URL");
    articleData = { ...articleData, NODE_ID, IMG_URL };
    articles.push(articleData);
  }
  
  
  const data = { articles };
  const html = renderToString(<App {...data} />);
  res.agnosticRender(html, data);
});
