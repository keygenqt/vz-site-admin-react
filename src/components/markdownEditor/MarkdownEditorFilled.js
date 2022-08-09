import {useCodeMirror} from "@uiw/react-codemirror";
import {langs} from "@uiw/codemirror-extensions-langs";
import {githubDark, githubLight} from '@uiw/codemirror-theme-github';
import * as React from "react";
import {useEffect, useRef} from "react";
import {
    Button,
    ButtonGroup,
    Divider,
    FormHelperText,
    Grid,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import {
    Brightness4Outlined,
    FormatBoldOutlined,
    FormatItalicOutlined,
    FormatListBulletedOutlined,
    FormatListNumberedOutlined,
    HMobiledataOutlined,
    HPlusMobiledataOutlined,
    InsertPhotoOutlined,
    LinkOutlined,
    TitleOutlined,
    VisibilityOutlined
} from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";

/**
 * Delay error show
 */
let timeoutError = null

/**
 * Colors component
 */
const colors = {
    light: {
        error: '#d32f2f',
        active: '#2196f3',
        default: '#808080',
        background: '#0000000f',
    },
    dark: {
        error: '#d32f2f',
        active: '#2196f3',
        default: '#bebebe',
        background: '#0D1117',
    }
}

export function MarkdownEditorFilled(props) {

    const {
        name,
        error = false,
        helperText = "",
        label = "",
        value = "",
        onBlur,
        onChange,
    } = props

    const editor = useRef();
    const field = useRef();
    const [valueInner, setValueInner] = React.useState(value);
    const [errorInner, setErrorInner] = React.useState(false);
    const [isFocus, setIsFocus] = React.useState(false);
    const [isDelayError, setIsDelayError] = React.useState(false);
    const [settings, setSettings] = React.useState(() => []);

    const getColor = () => {
        return settings.includes('dark') ? colors.dark : colors.light
    }

    const emitOnChange = () => {
        setTimeout(function () {
            field.current.querySelector('textarea').dispatchEvent(new Event('change', {bubbles: true}));
        }, 10);
    }

    const emitOnBlur = () => {
        const t = field.current.querySelector('textarea')
        t.focus();
        t.blur();
    }

    const onFocus = (v) => {
        setIsFocus(v.type === 'focus')
    }

    const onChangeInner = (v) => {
        setValueInner(v)
        emitOnChange(v)
    }

    const handleSettings = (event, update) => {
        setSettings(update);
    };

    const addFormatWithSelect = (start, end) => {

        const from = view.state.selection.ranges[0].from
        const to = view.state.selection.ranges[0].to

        const first = valueInner.slice(0, from)
            + (
                from === to
                && valueInner.length !== 0
                && valueInner.slice(to - 1, to) !== '\n'
                && (to === valueInner.length || valueInner.slice(to, to + 1) === '\n')
                    ? ' ' : '')
            + start
            + valueInner.slice(from, to);

        const second = first + end + valueInner.slice(to);

        setValueInner(second)
        view.focus()
        setTimeout(function () {
            view.dispatch({
                selection: {anchor: first.length, head: first.length},
                scrollIntoView: true
            })
        }, 10);
    };

    const addFormatSpace = (data, cursorUp = 0, space = '\n', ifNotEmpty = '') => {
        let from = view.state.selection.ranges[0].from

        const first = valueInner.slice(0, from)
            + (
                valueInner.length !== 0
                && valueInner.slice(from - 1, from) !== '\n'
                    ? space : ''
            )
            + (
                valueInner.length !== 0
                    ? ifNotEmpty : ''
            )
        const second = first + data + valueInner.slice(from, valueInner.length);

        setValueInner(second)
        view.focus()
        setTimeout(function () {
            view.dispatch({
                selection: {anchor: first.length + cursorUp, head: first.length + cursorUp},
                scrollIntoView: true
            })
        }, 10);
    };

    const {view, setContainer} = useCodeMirror({
        container: editor.current,
        theme: settings.includes('dark') ? githubDark : githubLight,
        basicSetup: {
            lineNumbers: false,
            foldGutter: false,
        },
        extensions: [langs.markdown()],
        height: '450px',
        value: valueInner,
        onChange: onChangeInner
    });

    useEffect(() => {
        if (editor.current) {
            setContainer(editor.current);
        }
    }, [setContainer]);

    useEffect(() => {
        if (error) {
            timeoutError = setTimeout(function () {
                setErrorInner(error)
            }, isDelayError ? 150 : 0);
        } else {
            clearTimeout(timeoutError);
            setErrorInner(false)
        }
    }, [error]);

    useEffect(() => {
        if (field.current) {
            field.current.querySelector('textarea').onchange = (e) => {
                onChange(e)
            }
        }
    }, [field.current]);

    return (
        <Grid container spacing={1} sx={{
            '&.cm-focused .cm-editor, & .cm-editor.cm-focused': {
                outline: 'none'
            },
            '& .cm-theme': {
                width: '100%',
                maxWidth: 'calc(100% - 48px)',
            },
            '& .react-markdown': {
                backgroundColor: getColor().background,
                color: settings.includes('dark') ? 'white' : 'black',
                fontSize: 15,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                padding: '10px',
                minHeight: '429px',
                width: '100%',
                margin: 0,
                overflow: 'auto',
                borderBottom: (errorInner ? 2 : 1) + 'px solid ' + (errorInner ? getColor().error : getColor().active)
            },
            '& .react-markdown a': {
                color: getColor().active,
                textDecoration: 'underline'
            },
            '& .react-markdown img': {
                maxWidth: '100%'
            },
            '& .react-markdown pre': {
                maxWidth: '100%',
                overflow: 'auto'
            },
            '& .cm-theme .cm-editor': {
                backgroundColor: getColor().background,
                paddingTop: '25px',
                paddingRight: '10px',
                paddingLeft: '10px',
                fontSize: 15,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                position: 'relative',
                borderBottom: '1px solid ' + getColor().default,
            },
            '& .cm-theme .cm-editor:before, & .cm-theme.cm-error .cm-editor:before': {
                content: `"${label}"`,
                position: 'absolute',
                color: errorInner ? (getColor().error + '!important') : getColor().default,
                left: '13px',
                transitionDuration: '200ms',
                fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                fontWeight: '400',
                lineHeight: '1.4375em',
                letterSpacing: '0.00938em',
                ...{
                    top: valueInner.length === 0 ? '20px' : '7px',
                    fontSize: valueInner.length === 0 ? '1rem' : '13px',
                }
            },
            '& .cm-theme.cm-focused .cm-editor:before, & .cm-theme .cm-editor.cm-focused:before': {
                top: '7px',
                fontSize: '13px',
                color: getColor().active,
            },
            '& .cm-theme .cm-activeLine': {
                backgroundColor: 'transparent',
            },
            '& .cm-theme .cm-editor:after': {
                content: '""',
                position: 'absolute',
                bottom: -1,
                margin: '0 auto',
                left: 0,
                right: 0,
                width: 0,
                transitionDuration: '200ms',
                borderBottom: '2px solid ' + (errorInner ? getColor().error : getColor().active)
            },
            '& .cm-theme.cm-focused .cm-editor:after, & .cm-theme .cm-editor.cm-focused:after , & .cm-theme.cm-error .cm-editor:after': {
                width: '100%',
            },
        }}>
            <Grid item xs={12}>

                <TextField
                    ref={field}
                    name={name}
                    multiline
                    type="text"
                    value={valueInner}
                    onBlur={onBlur}
                    rows={10}
                    sx={{
                        position: 'absolute',
                        opacity: 0,
                        '& .MuiOutlinedInput-root': {
                            padding: 0,
                            height: 0,
                        },
                        '& textarea': {
                            height: 1 + "px !important",
                            fontSize: 0
                        }
                    }}
                />

                <Stack
                    direction="row"
                    spacing={1}
                >
                    <div
                        className={'cm-theme' + (isFocus ? ' cm-focused' : '') + (errorInner ? ' cm-error' : '')}
                        ref={editor}
                        onBlur={() => {
                            if (onBlur) {
                                emitOnBlur()
                            }
                        }}
                        onFocus={() => {
                            setIsDelayError(true)
                        }}
                        style={{
                            display: settings.includes('preview') ? 'none' : 'block'
                        }}
                    />

                    {settings.includes('preview') ? <ReactMarkdown className={"react-markdown"}>
                        {valueInner}
                    </ReactMarkdown> : null}

                    <Stack
                        alignItems="center"
                        spacing={2}
                    >
                        {/*Group settings*/}
                        <ToggleButtonGroup
                            value={settings}
                            onChange={handleSettings}
                            orientation="vertical"
                            size="small"
                            color="info"
                            aria-label="settings"
                            sx={{
                                minWidth: 40,
                                '& button': {
                                    padding: '5px 0px',
                                    border: '1px solid #0288d180'
                                }
                            }}
                        >
                            <ToggleButton
                                value="preview"
                                aria-label="preview"
                                key="preview"
                                onBlur={onFocus}
                                onFocus={onFocus}
                                onClick={() => {
                                    view.focus()
                                }}>
                                <VisibilityOutlined fontSize="small"/>
                            </ToggleButton>

                            <ToggleButton
                                value="dark"
                                aria-label="dark"
                                key="theme"
                                onBlur={onFocus}
                                onFocus={onFocus}
                                onClick={() => {
                                    view.focus()
                                }}>
                                <Brightness4Outlined fontSize="small"/>
                            </ToggleButton>
                        </ToggleButtonGroup>

                        <Divider sx={{width: '100%'}}/>

                        <Stack
                            alignItems="center"
                            spacing={1}
                        >
                            {/*Group format text*/}
                            <ButtonGroup orientation="vertical" size="small" color={'info'}
                                         aria-label="Group format text">
                                <Button key="item-bold" onBlur={onFocus} onFocus={onFocus} onClick={() => {
                                    addFormatWithSelect('**', '**')
                                }}>
                                    <FormatBoldOutlined fontSize="small"/>
                                </Button>
                                <Button key="item-italic" onBlur={onFocus} onFocus={onFocus} onClick={() => {
                                    addFormatWithSelect('*', '*')
                                }}>
                                    <FormatItalicOutlined fontSize="small"/>
                                </Button>
                            </ButtonGroup>

                            {/*Group add links*/}
                            <ButtonGroup orientation="vertical" size="small" color={'info'}
                                         aria-label="Group add links">
                                <Button key="item-link" onBlur={onFocus} onFocus={onFocus} onClick={() => {
                                    addFormatSpace(
                                        "[Link text]()",
                                        12,
                                        ' '
                                    )
                                }}>
                                    <LinkOutlined fontSize="small"/>
                                </Button>
                                <Button key="item-img" onBlur={onFocus} onFocus={onFocus} onClick={() => {
                                    addFormatSpace(
                                        "![alt attribute]()",
                                        17,
                                        ' '
                                    )
                                }}>
                                    <InsertPhotoOutlined fontSize="small"/>
                                </Button>
                            </ButtonGroup>

                            {/*Group add headers*/}
                            <ButtonGroup orientation="vertical" size="small" color={'info'}
                                         aria-label="Group add headers">
                                <Button key="item-title-big" onBlur={onFocus} onFocus={onFocus} onClick={() => {
                                    addFormatSpace("\n===============")
                                }}>
                                    <TitleOutlined fontSize="small"/>
                                </Button>
                                <Button key="item-title-2" onBlur={onFocus} onFocus={onFocus} onClick={() => {
                                    addFormatSpace("## ", 3)
                                }}>
                                    <HPlusMobiledataOutlined fontSize="small"/>
                                </Button>
                                <Button key="item-title-3" onBlur={onFocus} onFocus={onFocus} onClick={() => {
                                    addFormatSpace("#### ", 5)
                                }}>
                                    <HMobiledataOutlined fontSize="small"/>
                                </Button>
                            </ButtonGroup>

                            {/*Group add components*/}
                            <ButtonGroup orientation="vertical" size="small" color={'info'}
                                         aria-label="Group add components">
                                <Button key="item-point-list" onBlur={onFocus} onFocus={onFocus} onClick={() => {
                                    addFormatSpace(
                                        "- \n" +
                                        "- \n" +
                                        "- \n" +
                                        "- \n" +
                                        "- \n",
                                        2,
                                        "\n",
                                        "\n"
                                    )
                                }}>
                                    <FormatListBulletedOutlined fontSize="small"/>
                                </Button>

                                <Button key="item-number-list" onBlur={onFocus} onFocus={onFocus} onClick={() => {
                                    addFormatSpace(
                                        "1. \n" +
                                        "2. \n" +
                                        "3. \n" +
                                        "4. \n" +
                                        "5. \n",
                                        3,
                                        "\n",
                                        "\n"
                                    )
                                }}>
                                    <FormatListNumberedOutlined fontSize="small"/>
                                </Button>

                            </ButtonGroup>
                        </Stack>
                    </Stack>

                </Stack>

                {errorInner ? <FormHelperText error={true} sx={{
                    marginLeft: 2,
                    marginRight: 2,
                }}>
                    {helperText}
                </FormHelperText> : null}

            </Grid>
        </Grid>
    )
}

MarkdownEditorFilled.propTypes = {
    error: PropTypes.bool,
    name: PropTypes.string,
    helperText: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func
};