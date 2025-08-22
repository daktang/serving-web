window.config = {
    namespace: 'aiserving-system',
    rootContext: "",

    apiGateway: {
        base_url_V2: '//portal.aiserving.dev.aip.domain.net/api/v2/',
        
        dit_ext_base_url_V1: '//portal.aiserving.dev.aip.domain.net/ext-dit/api/v1/',
        modelWebBackendUrl: '//portal.aiserving.dev.aip.domain.net/models',
    },
    coreApiUrl: '//portal.aiserving.dev.aip.domain.net/api/',
    kubeflowLogout: 'https://auth.dev.aip.domain.net/auth/realms/aiplatform/protocol/openid-connect/logout?client_id=serve&post_logout_redirect_uri=https://portal.aiserving.dev.aip.domain.net/after-logout/logout',
    sessionCheckInterval: 60,
    deploymentName: ["ASP-DIT",],
    
    disableActionHistory: 'true',
    
    defaultAffinityConfig: 'servingPool',
    
    kubeflowURL: '//portal.aiserving.dev.aip.domain.net/',
    kubeflowBaseUrl: 'portal.aiserving.dev.aip.domain.net',

    servingExtBaseUrl: '/serving',
    
    metadata: { name: 'FrontendConfigmap' },
    applicationName: "AI Serving Portal",
    applicationSubName: "",
    applicationRelease: "Release 1.7.0 | December 2023",
buildId: '', commitHash: '', 
    applicationTitle: "AI Serving Portal"
};
