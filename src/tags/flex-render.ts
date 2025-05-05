export interface Input<TProps extends object> {
    value: any;
    props: TProps;
}

export function flexRender<TProps extends object>(component: any, props: TProps) {
    if (typeof component === 'function') {
        return component(props)
    }

    return component
}