// src/components/APIKeyManagement/AddAPIKey/index.js
// 목적: "Select Namespace" 클릭 시 백색화면 원인 추적을 위해 **로그만** 추가 (동작 변경/리팩토링 없음)

import React, { useEffect, useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import {
    FormHelperText,
    FormControl,
    InputLabel,
    MenuItem,
    Typography
} from '@material-ui/core';
import SimpleReactValidator from 'simple-react-validator';
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import CustomizedDialogs from '../../../shared/components/CustomizedDialog';
import validations from '../../../shared/constants/validations';
import {
    setValidationFlag,
    requestDispatch,
    showValidationMessageFor,
    hideMessages,
    getConfigValue,
    verifyConfigValue
} from '../../../shared/utils/common/utility';
import * as actionTypes from '../../../shared/redux/actions/aiStarterKit/types';
/* eslint-disable-next-line import/no-unresolved */
import { inlineCustomStyle } from '../../Notebook/AddNotebook/inlineCustomStyle';
/* eslint-disable-next-line import/no-unresolved */
import ResizerTextEditor from '../../ResizableTextEditor/ResizableTextEditor';
import MLSelect from '../../../libs/common/atoms/MLSelect/MLSelect';
import MLTextbox from '../../../libs/common/atoms/MLTextbox/MLTextbox';
import MLAutoComplete from '../../../libs/common/atoms/MLAutoComplete/MLAutoComplete';
import * as actionTypes1 from '../../../shared/redux/actions/apiKeyMgmt/types';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import httpStatusCodes from '../../../shared/constants/httpStatusCodes';
import { getItem } from '../../../shared/services/storage.service';
import { orderBy } from 'lodash';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    // width: 200,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const getMessage = (message) => <span>{message}</span>;

function AddAPIKey(props) {
    const count = 0;
    const dispatch = useDispatch();
    const { handleClose, t, open, setCurrentAction, setApiKeyDetails, setOpenViewApiKey } = props;
    const useStyles1 = makeStyles(() => inlineCustomStyle);
    const classes1 = useStyles1();
    const initialState = {
        description: "",
        expiration: "",
        namespace: "",
        id: null,
        modelServerTransferList:[],
    };
    const [state, setState] = useState(initialState);
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);
    const [allModelServerCandidates, setAllModelServerCandidates] =useState([]);
    const [isDisableCreate, setIsDisableNext] = useState(true);

    // filter unique model server candidates
    useEffect(()=> {
        const uniqueIds = [];
        allModelServerCandidates.filter((element) => {
            let isDuplicate = false;
            for(let i=0; i<uniqueIds.length; i++){
                if(uniqueIds[i].metadata.uid === element.metadata.uid) {
                    isDuplicate = true;
                }
            }
            if(!isDuplicate){
                uniqueIds.push(element);
            }
        })
        setAllModelServerCandidates(uniqueIds);
    }, [allModelServerCandidates.length])

    const addApiKeyStatus = useSelector(state => state.apiKeyMgmt.addAPIKeyDetail);
    const configurationList = useSelector(state => state.configuration.configurationList);
    let expirationDetails =  getConfigValue(configurationList, 'api-key-exp-client');
    expirationDetails = expirationDetails && verifyConfigValue(expirationDetails);
    expirationDetails = orderBy(expirationDetails, ['order']);

    const targetProjectList = useSelector(state => state.apiKeyMgmt.projectLists.project);
    const modelServerTransferList = useSelector(state => state.apiKeyMgmt.modelServerCandidatesList);

    // // filter list whose status is ready
    // modelServerTransferList.filter((namespace)=> {
    //     const readyCondition = getReadyCondition(namespace);
    //     return readyCondition
    // })

    const [, forceUpdate] = useState();
    const validator = useRef(
        new SimpleReactValidator({
            element: message => getMessage(message),
            validators: {
                notebookServerName: {
                    // name the rule
                    message:
                        'Name must consist of lowercase alphanumeric characters or "-", start with an alphabetic character, and end with an alphanumeric character.',
                    rule: (val, params, validatorPerm) => (
                        validatorPerm.helpers.testRegex(
                            val,

                            /^(([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])\.)*([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])$/
                        ) && params.indexOf(val) === -1
                    )
                }
            }
        })
    ).current;

    const handleChange = (event) => {
        const { value, name } = event.target;
        showValidationMessageFor(validator, description);
        setState(prevState => ({ ...prevState, [name]: value}));
    };

    const handleSubmit = () => {
        if (!validator.allValid()) {
            validator.showMessages();
            forceUpdate({});
            return;
        }

        const targetServicesList = [];
        const keyCloakObj = [];
        const {empty = '', controlledActions = {}, ...formData} = state;

        for(let selectedCandidateIndex = 0; selectedCandidateIndex < right.length; selectedCandidateIndex++) {
            (allModelServerCandidates || []).map((item) => {
                if(right[selectedCandidateIndex] === item.metadata.name){
                    targetServicesList.push(
                        {
                            namespace: item.metadata.namespace,
                            name: item.metadata.name
                        }
                    )
                }
            })       
        }

        expirationDetails.map((item)=> {
            if(formData.expiration === item.name){
                keyCloakObj.push(
                    {
                        keycloak_client_id: item.keycloak_client_id,
                        keycloak_client_secret: item.secret
                    }
                )
            }
        })

        dispatch({
            type: requestDispatch(actionTypes1.ADD_API_KEY),
            payload: {
                keycloak_client_id: keyCloakObj[0].keycloak_client_id,
                keycloak_client_secret: keyCloakObj[0].keycloak_client_secret,
                description: formData.description,
                target_services: targetServicesList
            }
        });
    };

    const resetForm = () => {
        hideMessages(validator);
        forceUpdate({});
        setState(initialState);
        setAllModelServerCandidates([]);
        handleClose();
        dispatch({
            type: actionTypes1.RESET_API_KEY_DETAIL
        });
    };

    useEffect(() => {
        if (addApiKeyStatus && addApiKeyStatus.status === httpStatusCodes['200']) {
            resetForm();
            setApiKeyDetails({
                name: addApiKeyStatus.data.result.apikey_name,
                created_by: getItem('accountName')
            })
            setCurrentAction('VIEW');
            setOpenViewApiKey(true);
        }
    }, [addApiKeyStatus])

    useEffect(() => {     
        // call list of projects the account belongs to on load
        dispatch({
            type: requestDispatch(actionTypes1.GET_PROJECT_LIST),
        });

        document.querySelectorAll('body')[0].classList.add('add-api-key-popups');
        return () => {
            document.querySelectorAll('body')[0].classList.remove('add-api-key-popups');
        };
    }, []);

    const modelServerCandidateList = (namespace) => {
        dispatch({
            type: requestDispatch(actionTypes1.GET_MODEL_SERVER_CANDIDATES_LIST),
            payload: namespace
        });
    }

    const handleNamespace = (value) => {
        setState({
            ...state,
            namespace: value.namespace
        })
        modelServerCandidateList(value.namespace);
    }

    useEffect(()=> {
        modelServerTransferList.length && transferList();
    },[modelServerTransferList])

    const transferList = () => {
        const currentCandidates = [];
        const transferCandidatesArray = [];
        modelServerTransferList.map((item)=> {
            currentCandidates.push(item);
            if(right.length){
                if(!right.includes(item.metadata.name)){
                    transferCandidatesArray.push(item.metadata.name);
                }
            }else{
                transferCandidatesArray.push(item.metadata.name);
            }
        })
        setLeft(transferCandidatesArray);
        setAllModelServerCandidates([...allModelServerCandidates, ...currentCandidates]);
    }

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

    const customList = (title, items) => (
        <Card>
            <List className={classes.list} dense component="div" role="list">
                {items.map((value) => {
                const labelId = `transfer-list-all-item-${value}-label`;

                return (
                    <ListItem className={`${checked.includes(value) ? 'span-bg-color' : ''}`} key={value} role="listitem" button onClick={handleToggle(value)}>
                        <ListItemIcon>
                            <Checkbox
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                    <ListItemText id={labelId} primary={value} className="transfer-list-test"/>
                    </ListItem>
                );
                })}
                <ListItem />
            </List>
        </Card>
    );


    const content = (
        <Grid container spacing={3} className='menu-grid'>
            <Grid item xs={12} className="new-api-key-desc">
                    <MLTextbox
                        name='description'
                        error={setValidationFlag(
                            'description',
                            state.description,
                            validations.apiKeyManagement.description,
                            validator
                        )}
                        id='description'
                        label={
                            <span>
                                Description<span style={{ color: '#b51905' }}>*</span>
                            </span>
                        }
                        placeholder={t('C_DESCRIPTION_MULTI_LINE')}
                        type='text'
                        variant='outlined'
                        size='small'
                        fullWidth
                        className='menu-input multiline-desc modal-desc'
                        value={state.description}
                        onChange={e => handleChange(e, 'description')}
                        inputProps={{ maxLength: 2048 }}
                        rows={4}
                        multiline
                        showFooter={true}
                        helperText={validator.message(
                            'description',
                            state.description,
                            validations.apiKeyManagement.description
                        )}
                    />
            </Grid>

            <Grid item xs={12} className='background-focus'>
                <FormControl variant='outlined'
                    error={setValidationFlag(
                        'expiration',
                        state.expiration,
                        validations.apiKeyManagement.expiration,
                        validator
                    )}
                    fullWidth
                    className='menu-input'
                    margin='dense'
                >
                    <InputLabel id='framework-label'>
                        <span>
                            Expiration<span style={{ color: '#b51905' }}>*</span>
                        </span>
                    </InputLabel>
                    <MLSelect
                        type='text'
                        variant='outlined'
                        size='small'
                        fullWidth
                        className='menu-input'
                        labelId='framework-label'
                        id='serving-framework'
                        value={state.expiration}
                        name='expiration'
                        label='expiration'
                        onChange={e => handleChange(e, 'expiration')}
                        MenuProps={{
                            classes: { paper: classes1.select },
                            variant: 'menu'
                        }}
                    >
                        {
                            expirationDetails.length > 0 ? (
                                expirationDetails.map((item) => (
                                    <MenuItem key={count + 1} value={item.name}>
                                        <span>{item.name}</span>
                                    </MenuItem>
                                ))) : (
                                <MenuItem value='none'>None</MenuItem>
                            )}
                    </MLSelect>
                    <FormHelperText>
                        {validator.message('expiration', state.expiration, validations.apiKeyManagement.expiration)}
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Typography
                    variant='h6'
                    align='left'
                    gutterBottom
                    className={`popup-sub-heading weight-bold ${classes1.heading}`}
                >
                    Target Model Servers<span style={{ color: '#b51905' }}>*</span>
                </Typography>
            </Grid>

            <Grid container xs={12}>
                <Grid xs={6} className="namespace-left">
                    <MLAutoComplete
                        id='namespace'
                        name='NameSpace'
                        placeholder='Select Namespace'
                        options={targetProjectList}
                        getOptionLabel={option => option.namespace}
                        // defaultValue={targetModelServerList ? targetModelServerList[0].namespace : null}
                        disableClearable
                        size='small'
                        // value={state && state.namespace}
                        onChange={(e, value) => handleNamespace(value)}
                        renderInput={params => (
                            <MLTextbox
                                id='namespace'
                                error={false}
                                {...params}
                                variant='outlined'
                                name="namespace"
                                label="Select Namespace"
                                size='small'
                                style={{ fontSize: '14px' }}
                                inputProps={{
                                    ...params.inputProps,
                                    maxLength: 63
                                }}
                            />
                        )}
                        openText=''
                        closeText=''
                    />
                </Grid>

                <Grid xs={6} className="namespace-right">
                    <span>Selected</span>
                </Grid>
            </Grid>

            <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                className={classes.root}
                xs={12}
                >
                <Grid item xs={5} className="transferList-border">{customList('Choices', left)}</Grid>
                <Grid item xs={2} className="transferList-buttons">
                    <Grid container direction="column" alignItems="center">
                    <Button
                        size="medium"
                        className={classes.button, 'transfer-list-icon'}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        <PlayCircleOutlineIcon />
                    </Button>
                    <Button
                        size="medium"
                        className={classes.button, 'transfer-list-icon'}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        <PlayCircleOutlineIcon className="rotate-icon" />
                    </Button>
                    </Grid>
                </Grid>
                <Grid item xs={5} className="transferList-border">{customList('Chosen', right)}</Grid>
            </Grid>
        </Grid>
    );

    const isDisableCreateBtn = () => {
        if(right.length > 0 && state.description && state.expiration) {
            setIsDisableNext(false);
        }else {
            setIsDisableNext(true);
        }
    }

    useEffect(()=> {
        isDisableCreateBtn();
    }, [right, state.expiration, state.description])

    return (
            <CustomizedDialogs
                open={open}
                fullWidth
                classNames="custom-popup"
                title={
                    <div className="modal-header flex align-center">
                        <div className='popup-header-template'>
                            {t('New API Key')}
                        </div>
                    </div>
                }
                buttonName={'CREATE'}
                content={<ResizerTextEditor width={725} height={550} editableContainer={content} />}
                // contentText=''
                handleSubmit={handleSubmit}
                handleClose={resetForm}
                formName='Add Model'
                disableContinueBtn={isDisableCreate}
            />
    );
}
export default withTranslation()(AddAPIKey);
