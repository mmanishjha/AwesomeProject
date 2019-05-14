const Nav = DrawerNavigator(this.getNavItems(this.state.drawerSource.navItems));

        const AppNavigator = (StackNavigator(
            {
                Drawer: { screen: Nav },
            },
            {
                initialRouteName: "Drawer",
                headerMode: "none",
            })
        );

        return (<AppNavigator />);

getNavItems(navItems) {
    return navItems.reduce((routes, navItem) => {
        routes[navItem.id] = this.getNavItem(navItem);

        return routes;
    }, {});
}

getNavItem(navItem) {
    return {
        screen: (props) => <MyScreen {...props} id={navItem.id} />,
        navigationOptions: {
            ***any navigation properties
        }
    }        
}