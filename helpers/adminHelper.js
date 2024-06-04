const getUserAuthorizedPages = (user) => {
    const pages= [];
    user.roleIds.forEach(role => {
        role.pageIds.forEach(page => {
            if(!pages.some(p=> p._id === page._id))
                pages.push(page)
        })
    });

    let sortedPages = pages.sort((a, b) => (a.order < b.order ? -1 : 1));
    return sortedPages;
}

module.exports = { getUserAuthorizedPages };