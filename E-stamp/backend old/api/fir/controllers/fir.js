'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    // create: async ctx => {

    //     let entity;
    //     if (ctx.is('multipart')) {
    //         const { data, files } = parseMultipartData(ctx);
    //         entity = await strapi.services.fir.create(data, { files });
    //     } else {
    //         entity = await strapi.services.fir.create(ctx.request.body);
    //     }
    //     console.log(ctx.request.body);
    //     return sanitizeEntity(entity, { model: strapi.models.fir });
    // },
};
