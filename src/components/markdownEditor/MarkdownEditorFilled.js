import {useCodeMirror} from "@uiw/react-codemirror";
import {langs} from "@uiw/codemirror-extensions-langs";
import {githubDark, githubLight} from '@uiw/codemirror-theme-github';
import * as React from "react";
import {useEffect, useRef} from "react";
import {Button, ButtonGroup, Divider, Grid, Stack, ToggleButton, ToggleButtonGroup, useTheme} from "@mui/material";
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

export function MarkdownEditorFilled(props) {

    const {
        label = "",
        value = "",
        onChangeValue
    } = props

    const [valueInner, setValueInner] = React.useState(value);
    const [isFocus, setIsFocus] = React.useState(false);
    const [settings, setSettings] = React.useState(() => []);

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

    const onFocus = React.useCallback((v) => {
        setIsFocus(v.type === 'focus')
    }, []);

    const onChange = React.useCallback((v) => {
        setValueInner(v)
        if (onChangeValue) {
            onChangeValue(v)
        }
    }, []);

    const editor = useRef();

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
        onChange: onChange
    });

    useEffect(() => {
        if (editor.current) {
            setContainer(editor.current);
        }
    }, [editor.current]);

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
                backgroundColor: settings.includes('dark') ? '#0D1117' : '#0000000f',
                color: settings.includes('dark') ? 'white' : 'black',
                fontSize: 15,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                padding: '10px',
                borderBottom: '1px solid #808080',
                minHeight: '429px',
                width: '100%',
                margin: 0,
                overflow: 'auto'
            },
            '& .react-markdown a': {
                color: '#2196f3',
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
                backgroundColor: settings.includes('dark') ? '#0D1117' : '#0000000f',
                paddingTop: '25px',
                paddingRight: '10px',
                paddingLeft: '10px',
                fontSize: 15,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                position: 'relative',
                borderBottom: '1px solid #808080',
            },
            '& .cm-theme .cm-editor:before': {
                content: `"${label}"`,
                position: 'absolute',
                color: settings.includes('dark') ? '#ffffffd9' : '#0009',
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
                color: '#2196f3',
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
                borderBottom: '2px solid #2196f3',
            },
            '& .cm-theme.cm-focused .cm-editor:after, & .cm-theme .cm-editor.cm-focused:after': {
                width: '100%',
            },
        }}>
            <Grid item xs={12}>

                <Stack
                    direction="row"
                    spacing={1}
                >
                    <div className={'cm-theme' + (isFocus ? ' cm-focused' : '')} ref={editor} style={{
                        display: settings.includes('preview') ? 'none' : 'block'
                    }}/>

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
                            <ToggleButton value="preview" aria-label="preview" key="1-2" onBlur={onFocus} onFocus={onFocus} onClick={() => { view.focus() }}>
                                <VisibilityOutlined fontSize="small"/>
                            </ToggleButton>
                            <ToggleButton value="dark" aria-label="dark" key="1-1" onBlur={onFocus} onFocus={onFocus} onClick={() => { view.focus() }}>
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

            </Grid>
        </Grid>

    )
}

MarkdownEditorFilled.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChangeValue: PropTypes.func,
};