import * as React from 'react';
import {useEffect} from 'react';
import {FormControlLabel, FormGroup, Grid, MenuItem, Switch, TextField, useTheme} from "@mui/material";
import PropTypes from "prop-types";
import {AppCard, MarkdownEditorFilled, SplitButton} from "../../../../components";
import {Done, ViewListOutlined} from "@mui/icons-material";
import {useParams} from "react-router-dom";

const categories = [
    {
        value: 'android',
        label: 'Android',
    },
    {
        value: 'pc',
        label: 'PC',
    },
    {
        value: 'web',
        label: 'Web',
    },
    {
        value: 'ios',
        label: 'iOS',
    },
];

const markdown = `
Adminka
===================

![alt text](https://raw.githubusercontent.com/keygenqt/vz-site-admin-react/main/data/logo160.png)

Well, what site can exist without an admin panel? 
This is the admin panel for [my personal website](https://github.com/keygenqt/vz-site-react) and open source
projects.

**Used:** [React](https://reactjs.org/) + [MUI](https://mui.com/) :heart:

### Demo

[https://adminka.keygenqt.com](https://adminka.keygenqt.com/)

### Preview

![alt text](https://raw.githubusercontent.com/keygenqt/vz-site-admin-react/main/data/preview.png)

# License

\`\`\`
Copyright 2022 Vitaliy Zarubin

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
\`\`\`
`;


export function BlogPage({title}) {

    const theme = useTheme()

    let {id} = useParams();

    const [category, setCategory] = React.useState('android');
    const [content, setContent] = React.useState(markdown);

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    useEffect(() => {
        document.title = title;
    });

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <AppCard
                    type={'page'}
                    color={'blueLight'}
                    variant={'circles4'}
                    icon={<ViewListOutlined/>}
                    title={id === 'add' ? 'Here you can create a new post' : 'Here you can edit the post'}
                    contentHeight={504}
                >
                    <FormGroup>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Select"
                                    value={category}
                                    onChange={handleChange}
                                    helperText="Please select category pose"
                                    variant="filled"
                                >
                                    {categories.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Title"
                                    variant="filled"
                                    helperText="Please fill in the title"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    minRows={4}
                                    label="Description"
                                    variant="filled"
                                    helperText="Please fill in the description for list"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <MarkdownEditorFilled
                                    label="Post content"
                                    value={content}
                                    onChangeValue={(value) => {
                                        setContent(value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Switch defaultChecked/>}
                                    label="Post published"
                                />
                            </Grid>
                            <Grid item xs={12} sx={{
                                textAlign: 'end'
                            }}>
                                <SplitButton
                                    color={theme.palette.success.main}
                                    size={'medium'}
                                    endIcon={<Done/>}
                                    onClick={() => {

                                    }}
                                >
                                    Add
                                </SplitButton>
                            </Grid>
                        </Grid>
                    </FormGroup>
                </AppCard>
            </Grid>
        </Grid>
    );
}

BlogPage.propTypes = {
    title: PropTypes.string,
};