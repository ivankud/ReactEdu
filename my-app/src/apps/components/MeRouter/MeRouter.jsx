import React from "react";
import {router_list} from "../../main_designer/root";

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