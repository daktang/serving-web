//fixed
import { concatenateUrl, getUserRole } from '../../utils/common/utility';

export const V2_API_URL_BASE = window && window.config ? concatenateUrl(window.config.coreApiUrl, 'v2') : '';
export const V3_API_URL_BASE = window && window.config ? concatenateUrl(window.config.coreApiUrl, 'v3') : '';
export const baseKubeflowUrl = window && window.config ? window.config.kubeflowURL : '';
export const kubeflowLogoutUrl = window && window.config ? window.config.kubeflowLogout : '';
export const BASE_URL_API_EXT = window && window.config ? concatenateUrl(window.config.coreApiUrl, 'v2') : '';
export const BASE_URL_API_EXT_V1 = window && window.config && window.config.apiGateway && window.config.apiGateway.dit_ext_base_url_V1 || '';
export const xcloudServingApiUrl = window && window.config && window.config.xcloudServingApiUrl ? window.config.xcloudServingApiUrl : '';
export const xcloudArchiveApiUrl = window && window.config && window.config.xcloudArchiveApiUrl ? window.config.xcloudArchiveApiUrl : '';
export const xcloudJobApiUrl = window && window.config && window.config.xcloudJobApiUrl ? window.config.xcloudJobApiUrl : '';
export const xcloudEtmApiUrl = window && window.config && window.config.xcloudEtmApiUrl ? window.config.xcloudEtmApiUrl : '';
export const disableActionHistory = window && window.config && window.config.disableActionHistory ? window.config.disableActionHistory : '';
export const rootContext = window && window.config && window.config.rootContext && (window.config.rootContext == '/' ? '' : window.config.rootContext) || '';
export const  MODEL_WEB_BACKEND_URL= window && window.config && window.config.apiGateway && window.config.apiGateway.modelWebBackendUrl || '';
export const KUBEFLOW_URL = window && window.config ? window.config.kubeflowURL : '';

// Domain constants
const USERS = 'users';
const NODES = 'nodes/management';
const AUTHENTICATION = 'authentication/';
export const MENU = 'menu';
const PROJECT_USER = 'edit_role';
const ROLES = 'roles';
const ADD_USER = 'add_user';
export const RESOURCE_SUMMARY = 'resource-summary?project_name=';
export const RESOURCE_QUOTA = 'kubernetes/resource_quota';
const GET_ROLES_BY_USER_ID = 'get_roles_by_user_id';
const pipelineUrl = '_/pipeline/#/pipelines';
const katibUrl = 'katib/#/';
const artifactsUrl = 'metadata/#/artifacts';
export const TENSORBOARD_URL = '_/tensorboards/#/';
export const RUNS_URL = '_/pipeline/#/runs';
export const RECURRINGRUNS_URL = '_/pipeline/#/recurringruns';
export const EXECUTIONS_URL = '_/pipeline/#/executions';
export const EXPERIMENTS_KFP_URL = '_/pipeline/#/experiments';
export const RESOURCE_SUMMARY_EXT = 'dit/resource_summary?project_name=';
export const repository = 'namespaces/repository';
export const activityKubeflow = 'api/activities'
export const pipelineKubeflow = 'pipeline/apis/v1beta1/runs'


export const PIPELINE_EXT_URL = () => concatenateUrl(baseKubeflowUrl, pipelineUrl);

export const ACTIVITY_KUBEFLOW_URL = () => concatenateUrl(baseKubeflowUrl, activityKubeflow);

export const PIPELINE_KUBEFLOW_URL = () => concatenateUrl(baseKubeflowUrl, pipelineKubeflow);

export const KATIB_URL = () => concatenateUrl(baseKubeflowUrl, katibUrl);

export const ARTIFACTS_URL = () => concatenateUrl(baseKubeflowUrl, artifactsUrl);

export const LOGIN_URL = () => concatenateUrl(V3_API_URL_BASE, 'authenticate');

// Users API Endpoint
export const GET_USERS_URL = () => concatenateUrl(V2_API_URL_BASE, USERS);

export const UPDATE_USER_ROLES_URL = () => concatenateUrl(V2_API_URL_BASE, PROJECT_USER);

export const ADD_USER_ROLES_URL = () => concatenateUrl(V2_API_URL_BASE, ADD_USER);

export const DELETE_USER_URL = () => concatenateUrl(V2_API_URL_BASE, USERS);

export const GET_USER_ROLES = () => concatenateUrl(V2_API_URL_BASE, GET_ROLES_BY_USER_ID);

// Menu API Endpoint

export const GET_RESOURCE_URL = projectName => `${concatenateUrl(V3_API_URL_BASE, RESOURCE_SUMMARY)}${projectName}`;

// Node API Endpoint
export const GET_NODES_URL = () => concatenateUrl(V2_API_URL_BASE, NODES);

// Node Put API Endpoint
export const PUT_NODES_URL = () => concatenateUrl(V2_API_URL_BASE, NODES);

export const EXCLUSIVE_RESOURCE = 'kubernetes/exclusive_resource';

const resourceSummaryURL = concatenateUrl(BASE_URL_API_EXT_V1, RESOURCE_SUMMARY_EXT);

export const GET_RESOURCE_URL_EXT = projectName => resourceSummaryURL+projectName;

export const GET_RESOURCE_QUOTA_URL_EXT = () => concatenateUrl(BASE_URL_API_EXT_V1, resourceQuotaGet);


export const projectManagement = {
    projects: 'admin/projects',
    accountSearch: 'users',
    projectQuota: 'projects/quota'
};

export const DASHBOARD_URL = 'dashboard/data';
export const RECENT_JOBS = 'jobs/recent';
export const RECENT_NOTEBOOKS = 'namespaces/notebooks/recent';

export const ACTIVITY_URL = 'get_ai_activity';
export const PIPELINE_URL = 'get_ai_pipeline';

export const configNotebook = 'config';
export const notebook = 'namespaces/notebooks';
export const restartNB = 'namespaces/notebooks/restart';
export const stopNotebookConf = 'namespaces/notebooks/stop';
export const maxCpuNotebook = 'get_cpu_memory';
export const notebookGenerate = 'images/notebook-save';
export const getNbDesc = 'namespaces/get_nb_info';


export const images = 'namespaces/images';
export const generateImages = 'namespaces/images/generate';
export const volumes = 'project/volume';
export const volumeApiUrl = 'volume-api/';
export const users = 'users';
export const userProjectDetails = 'user-detail';
export const notice = 'notice';
export const noticeSeen = 'notice/seen';
export const signOut = 'logout';
export const podLogStatus = 'namespaces/pod_log_status';

export const sessionCheck = 'check_user_session';
export const maxVolumeSize = 'max_storage';
export const getStorageClasses = 'storage/get-storage-class';
export const jobSubmissionGET = 'templates';
export const jobSubmissionPOST = 'job/submission';
export const uiConfig = 'about';
export const actionListing = 'actions'
export const actionHistory = 'actions/histories'
// Template Management
export const templates = 'templates';
export const adminConfig = 'admin_config';

export const adminConfig_public = 'public/admin_config';

// ML Management
export const mlFLow = 'kubernetes/mlflow';
export const mlTest = 'kubernetes/mlflow/test-connection-s3';

//Label Studio
export const labelStudio = 'kubernets/labelStudio';

// Roles API Endpoint
export const GET_ROLES_URL = () => concatenateUrl(V2_API_URL_BASE, ROLES);

export const PUT_ROLE_URL = () => concatenateUrl(V2_API_URL_BASE, ROLES);

export const POST_ROLE_URL = () => concatenateUrl(V2_API_URL_BASE, ROLES);

export const DELETE_ROLE_URL = () => concatenateUrl(V2_API_URL_BASE, ROLES);

// Resource Quota

export const GET_RESOURCE_QUOTA_URL = () => concatenateUrl(V2_API_URL_BASE, RESOURCE_QUOTA);

export const PUT_RESOURCE_QUOTA_URL = () => concatenateUrl(V2_API_URL_BASE, RESOURCE_QUOTA);

//  dit apis
export const employeeSearch = 'dit/emp_search';
export const publicEmployeeSearch = 'dit/public/emp_search';
export const resourceQuotaDetails = 'dit/project-resource-request';
export const ditRolesEdit = 'dit/edit_role';
export const ditAddRole = 'dit/add-user-to-project';
export const ditProject = 'dit/project';
export const ditAddUser = 'dit/add-user-to-project';
export const ditUsersDelete = 'dit/users';
export const requestProject = 'dit/project-request';
export const publicRequestProject = 'public/project_request';
export const duplicateProjectCheck = 'dit/duplicate-project-check';
export const publicDuplicateProjectCheck = 'dit/public/duplicate-project-check';
export const publicUserAgreement = 'dit_user_agreements';
export const userAgreement = 'dit/user_agreements';
export const userConsent = 'dit/user-consent';
export const resourceConfig = 'dit/admin-config';
export const publicResourceConfig = 'dit/public/admin-config';
export const changeResourceQuota = 'dit/changeResourceQuota';
export const userTerms = 'dit/terms';
export const resourceQuotaGet = 'dit/resource_quota';
export const resourceQuotaUpdate = 'dit/resource_quota';
export const existingNewProject = 'dit/projects';
export const requesterDetails = 'dit/projects';
export const deleteDitUser = 'dit/user_delete';
export const ditProjectQuoata = 'dit/projects/quota';

// Serving APIs
export const models = 'models';
export const adminModels = 'admin/models';
export const POST_MODEL_FILE = 'models/files';
export const GET_MODEL_FILE = 'models/files/';
export const GetPostInferenceService = 'inferenceservices';
export const GetPostAdminInferenceService = 'admin/inferenceservices';
export const deleteInference = 'inferenceservices';
export const getTransformerFile = 'transformers/files';
export const postTransformerFile = 'transformers/files';
export const inferenceServiceStatus = 'inferenceservices/status';
export const inferenceServiceAdminStatus = 'admin/inferenceservices/status';

// For Prediction
export const predictions = 'inferences';

// For Jobs Archived
export const jobsArchived = 'air-archive/Archive/';

export const jobsArchivedList = 'Archive/jobs';
export const jobsArchivedDetail = 'Archive/job';
export const jobsArchivedLog = 'Archive/log';

// For Job Queue
export const jobsQueue = 'air-job/';
export const jobsQueueList = 'job/job/listall';
export const mpiJobQueue = 'mpi/mpijob';
export const tfJobQueue = 'tf/tfjob';
export const pytorchJobQueue = 'pytorch/pytorchjob';
export const mxnetjobQueue = 'mxnet/mxjob';
export const xgboostjobQueue = 'xgboost/xgboostjob';
export const mpiJobQueuePods = 'mpi/mpipod/list';
export const tfJobQueuePods = 'tf/tfpod/list';
export const pytorchJobQueuePods = 'pytorch/pytorchpod/list';
export const mxnetJobQueuePods = 'mxnet/mxjobpod/list';
export const xgboostJobQueuePods = 'xgboost/xgboostjobpod/list';



// For ETM 
export const etmJobSearch = 'jobs/search';
export const etmViewStatus = 'jobs/view-status';
export const etmJobs = 'jobs';
export const etmAPIKey = 'apikeys/user'

// For External ETM
export const externalETM = 'projects/external-projects';

// fetch models chart data
export const modelSummary = 'models/summary/';


// fetch models chart data
export const inferenceSummary = 'inferenceservices/summary/';


//  fetch predictions chart data 
export const predictionsSummary = 'inferences/statistics/';

// fetch Admin CPU and memory  chart data
export const adminCpuAndMemorySummary = 'admin/resources/summary';


// fetch Admin Inference chart data
export const adminInferenceSummary = 'admin/inferenceservices/summary';


//  fetch adminInferenceservices list data 
export const abnormalInferenceservices = 'admin/inferenceservices';
export const volumeBrowser = 'volumes/';


// fetch category list

export const categoryAverageUtilization = 'get_jobs';

// get Line Chart Data

export const LineChartDataListUrl = 'resource-utilization';

// get target data
export const targeturl = 'category_jobs';

export const repositories = 'repositories';
export const repositoryTestConnection = {
    'Object Storage': 'repositories/object-storage',
    'Git Repository': 'repositories/git-repository',
    'Image Repository': 'repositories/image-repository'
}


// For Repository Credential API
export const credentials = 'credentials';

//For podListssss
export const podList = 'resource_summary/pods'

// For AI Starter Kit
export const starterKits = 'starter-kits';

//For Jobs and Notebook SSH Connections
export const sshConnection = 'ssh-connection';
//For Jobs and Notebook SSH Connections
export const sshServerCheck = 'ssh-server/ping';
export const sshAccount = 'ssh-account';

export const apiKeys = 'apikeys';


//  put DIT apis here based on this base url will change
export const DIT_APIS = [
    employeeSearch,
    resourceQuotaDetails,
    ditRolesEdit,
    ditProject,
    ditUsersDelete,
    requestProject,
    duplicateProjectCheck,
    publicUserAgreement,
    userAgreement,
    userConsent,
    resourceConfig,
    changeResourceQuota,
    resourceQuotaGet,
    resourceQuotaUpdate,
    userTerms,
    existingNewProject,
    requesterDetails,
    deleteDitUser,
    publicResourceConfig,
    ditAddUser,
    ditAddRole,
    publicEmployeeSearch,
    publicDuplicateProjectCheck,
    publicRequestProject,
    "admin-config",
    "emp_search",
    "project_request",
    "duplicate-project-check"
];

//  put Serving apis here based on this base url will change.
export const SERVING_APIS = [
    models,
    POST_MODEL_FILE,
    GET_MODEL_FILE,
    GetPostInferenceService,
    getTransformerFile,
    predictions,
    inferenceServiceStatus,
    modelSummary,
    predictionsSummary,
    inferenceSummary,
    predictionsSummary,
    adminCpuAndMemorySummary,
    adminInferenceSummary,
    abnormalInferenceservices
];

// Archive Job APIs here based on this base url will change

export const JOBS_API = [jobsArchivedList, jobsArchivedDetail, jobsArchivedLog];

// Job Queue

export const JOBS_QUEUE_API = [jobsQueueList, mpiJobQueue, tfJobQueue, pytorchJobQueue, mxnetjobQueue, xgboostjobQueue, mpiJobQueuePods, tfJobQueuePods, pytorchJobQueuePods, mxnetJobQueuePods, xgboostJobQueuePods];
export const EXCLUDED_APIS = [...JOBS_QUEUE_API, projectManagement.projects, RESOURCE_QUOTA];

export const VERSION_2_API = [adminConfig, notice, notebook, restartNB, stopNotebookConf, MENU, projectManagement.projects, projectManagement.projectQuota, projectManagement.accountSearch, images, volumes, jobSubmissionPOST, userProjectDetails, generateImages, actionListing, targeturl, categoryAverageUtilization, credentials, actionHistory, DASHBOARD_URL, ACTIVITY_URL, PIPELINE_URL, repositories, repositoryTestConnection, podLogStatus, maxVolumeSize, podList, mlFLow, mlTest, sessionCheck, configNotebook, maxCpuNotebook, starterKits];

//V3 APIs
export const VERSION_3_API = [LineChartDataListUrl, templates, jobSubmissionGET, uiConfig, signOut, notebookGenerate, repositories, repositoryTestConnection, credentials,  sshConnection, sshServerCheck, sshAccount, RECENT_JOBS, RECENT_NOTEBOOKS, apiKeys];
export const ETM_API = [etmJobs, etmJobSearch, etmViewStatus, externalETM, etmAPIKey];

export const ACTIVITY_API = [activityKubeflow, pipelineKubeflow]

// BypassAPI


// Temporary code... Remove after Menu API integration
// const { roleId } = getUserRole();

// Temporary code... Remove after Menu API integration
// export const VERSION_2_BYPASS_API = [`menu/side-menu/detail?role_id=${roleId}`];

// Volume browser

export const VOLUME_BROWSER = [volumeBrowser];

export const sysAdminRoleID = 3;

// column resizer minimum width
export const columnResizerMinWidth = 55;

export const tooltipLength = 500;



// For Repository Credential API
export const credential = 'credential';

//Job Monitoring Steam log
export const streamLog = 'stream_log'
