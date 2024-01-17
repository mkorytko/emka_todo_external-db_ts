import React, { memo, useMemo } from "react";
import RCPagination from "rc-pagination";
import { connect, ConnectedProps } from "react-redux";
import { changePageAction } from "../../store/actions/app";
import {
    Pagination,
} from "../../types";
import { RootState } from "../../store";
import "./style.scss";

const locale = {
    items_per_page: "/ стр",
    jump_to: "Перейти",
    jump_to_confirm: "подтвердить",
    page: "",
    prev_page: "Назад",
    next_page: "Вперед",
    prev_5: "Предыдущие 5",
    next_5: "Следующие 5",
    prev_3: "Предыдущие 3",
    next_3: "Следующие 3",
};

const mapStateToProps = (store: any) => ({
    pagination: store.app.pagination,
    appPage: store.app.page,
});

const mapDispatchToProps = {
    onChange: changePageAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
    pagination: Pagination,
    appPage: number,
}

function TasksPagination({ pagination, appPage, onChange }: Props) {
    if (!pagination?.total || pagination?.total <= 3) {
        return null;
    }

    const {
        total,
        limit,
    } = pagination;

    const disabled = useMemo(() => total <= 3, [total]);

    return (
        <div className="Pagination__wrapper">
            <RCPagination
                disabled={disabled}
                onChange={onChange}
                locale={locale}
                current={appPage}
                pageSize={limit}
                showTitle
                total={total} />
        </div>
    );
}

export default connector(memo(TasksPagination));
