    
    import { Outlet } from "react-router-dom";
    import { Copyright } from "../../../../../shared/components/copyright/Copyright";

export function BeginLayout(){
    return(
        <div>
            <div style={{
                display: 'flex',
                flexDirection: 'column', 
                height: '100vh', 
                justifyContent: 'center', 
                alignItems: 'center'
            }}>
                <Outlet/>
            </div>
            <Copyright/>
        </div>
    )
}