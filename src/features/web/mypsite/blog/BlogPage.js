import * as React from 'react';
import {useEffect} from 'react';
import {FormControlLabel, FormGroup, Grid, MenuItem, Switch, TextField, useTheme} from "@mui/material";
import PropTypes from "prop-types";
import {AppCard, SplitButton} from "../../../../components";
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


export function BlogPage({title}) {

    const theme = useTheme()

    let {id} = useParams();

    const [category, setCategory] = React.useState('android');

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
                                    label="Mini Description"
                                    variant="filled"
                                    helperText="Please fill in the description for list"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                ...Codemirror Markdown...
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Switch defaultChecked />}
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