import { styled } from '@mui/material/styles';

export const ScrollbarWrapper = styled('div')(() => ({

    width: "100%",
    padding: 1,
    margin: 1,
    overflowX:'scroll',
    "::-webkit-scrollbar": {
        width: "8px",
    },
    "::-webkit-scrollbar-track": {

        borderRadius: "5px"
    },
    "::-webkit-scrollbar-thumb": {
        background: "darkgrey",
        borderRadius: "15px",
        height: "2px"
    },
    "::-webkit-scrollbar-thumb:hover": {
        background: "lightBlue",
        maxHeight: "10px"
    },
    "::-webkit-scrollbar-button:vertical:start:decrement": {
        background: `url(${process.env.PUBLIC_URL}/static/icons/arrow-example.png) no-repeat center center`,
        display: "block",
        backgroundSize: "10px"
    },
    "::-webkit-scrollbar-button:vertical:end:increment": {
        display: "block",
        background: `url(${process.env.PUBLIC_URL}/static/icons/arrow-example.png) no-repeat center center`,
        backgroundSize: "10px"
    },
}))



export default ScrollbarWrapper