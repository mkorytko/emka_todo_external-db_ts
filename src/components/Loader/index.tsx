import React, { FC, memo } from "react";
import { useAppSelector } from "../../store/hooks";

import "./style.scss";

const Loader: FC = () => {
    const { load } = useAppSelector((store) => store.app);

    if (!load) {
        return null;
    }

    return (
        <div className="loader-wrapper">
            <div className="progress" />
        </div>
    );
};

export default memo(Loader);
