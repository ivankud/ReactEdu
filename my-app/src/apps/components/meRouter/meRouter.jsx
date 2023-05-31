import React from "react";
import {router_list} from "../../lesson8/root";

const MeRouter = () => {
    return (
        <div>
            {router_list.map(item=>
                <div>
                    <a href={`${item.path}`}>{`${item.caption}`}</a>
                </div>
            )}
        </div>
    )
}

export default MeRouter;