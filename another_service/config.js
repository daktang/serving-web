// This config.js will be overwritten at the time of the deployment

window.config = {
    namespace: 'aiserving-system',
    rootContext: '',

    apiVersion: 'v1',
    metadata: {
        name: 'FrontendConfigmap'
    },
    apiGateway: {
        base_url_V2: '//localhost:5000/coreproxy/',
        dit_ext_base_url_V1: '//localhost:5000/extproxy/'
    },

    deploymentName: 'DIT',

    kubeflowURL: '//localhost:5000/kubeflowproxy/',
    kubeflowBaseUrl: 'localhost:5000/kubeflowproxy',
    kubeflowLogout:
        'https://auth.dev.aip.domain.net/auth/realms/aiplatform/protocol/openid-connect/logout?client_id=aiplatform&post_logout_redirect_uri=http://localhost:3000/after-logout/logout',

    applicationName: 'Kubeflow Enterprise',
    applicationSubName: '',
    applicationRelease: 'Release 1.3 | March 2022',
};
