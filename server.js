const Hapi = require('@hapi/hapi');
const HapiAuthCookie = require('@hapi/cookie');
const package = require('./package');
const db = require('./app/models/db');


(async () => {
    const server = Hapi.server({
        port: 3000,
        routes: {
            cors: true
        }
    });

    // pour éviter d'écrire les identifiants en dur, je les passerai en variables d'environnement
    
    await server.register(HapiAuthCookie);
    
    server.auth.strategy('base', 'cookie', {
        cookie: {
            name: 'cookie',
            password : 'Td2sXhE4Eghk8MBA3X96hgMqd66k8r2P',
            isSecure: false,
            ttl: 1000*60*20
        },
        redirectTo: '/login',
        validateFunc: async (request, cookie) => {
            const visitor = await db.query('SELECT * FROM usr WHERE email = $1', [cookie.email]);

            const user = visitor.rows[0];
            
            // if (user.role === 'user') { 
            //     return { valid: user !== undefined, credentials: {scope: 'user'} };
            // } else if (user.role === 'admin') {
            //     return { valid: user !== undefined, credentials: {scope: 'admin'} };
            // };
        }
    });


    await server.register ([
        {
            plugin: require('hapi-swagger'),
            options: {
                info: {
                    title: 'Apotest API Documentation',
                    version: package.version
                }
            }
        }, {
            plugin: require('./app/routes/_homePage')
        }, {
            plugin: require('./app/routes/_loginPage')
        },
        //  {
        //     plugin: require('./app/routes/_profilePage')
        // },
         {
            plugin: require('./app/routes/_filtredPage')
        }, {
            plugin: require('./app/routes/_updateProfile')
         },
         //{
        //     plugin: require('./app/routes/_creatorPage')
        // }
    ]);

    server.auth.default({ strategy: 'base', mode: 'try' });
    
    await server.start();
    console.log(`Server running on port ${server.settings.port}`);
})();

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});