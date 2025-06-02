import { Box } from "@mui/material";

export function Copyright() {
    return (
        <Box style={{ textAlign: 'center', padding: '20px', 
            color: 'var(--text-primary)', 
            position: 'fixed', 
            bottom: '10px', 
            width: '100%' }}>
            <span>© 2025 Kmlogger. All rights reserved.</span>
        </Box>
    );
}