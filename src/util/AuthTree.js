module.exports = {
    addNode(parent, child) {
        if (!parent.children) {
            parent.children = [];
        }
        parent.children.push(child);
    },
    initNode(data) {
        return {
            id: data.id,
            name: data.name,
            label: data.name,
            parentId: data.parentId,
            parentIds: data.parentIds,
            permission: data.permission,
            resourceType: data.resourceType,
            roles: data.roles,
            url: data.url,
        }
    },
    //查找节点
    findNode(id, tree) {
        let resultNode;

        function toFind(id, arr) {
            if (arr && arr.length && !resultNode) {
                for (let i = 0; i < arr.length; i++) {
                    let node = arr[i];
                    if (id == node.id) {
                        resultNode = node;
                        break;
                    } else {
                        let next = node.children;
                        toFind(id, next);
                    }
                }

            }
        }

        toFind(id, tree);
        return resultNode;
    },
    generateTree(datas) {
        let tree = [];
        for (let i = 0; i < datas.length; i++) {
            if (datas[i].parentId == 0) {
                tree.push(this.initNode(datas[i]));
                datas.splice(i, 1);
                i--;
            }
        }
        while (datas && datas.length) {
            for (let j = 0; j < datas.length; j++) {
                let child = this.initNode(datas[j]);
                let parentId = child.parentId;
                let parent = this.findNode(parentId, tree);
                if (parent) {
                    this.addNode(parent, child);
                    datas.splice(j, 1);
                    j--;
                }
            }
        }

        return tree;
    },


    //删除节点
    deleteNode(target, root) {
        let has = this.findNode(target, root);
        if (!has) {
            return
        }
        let findParent;
        if (target.id == root.id) {
            //如果删除的是根节点，直接赋null
            root = null;
            return;
        }

        function toDelete(target, parent) {
            if (target && parent && !findParent) {
                let next = parent.next;
                for (let i = 0; i < next.length; i++) {
                    let child = next[i];
                    if (child.id == target.id) {
                        findParent = parent;
                    }
                    toDelete(target, child);
                }
            }
        }

        toDelete(target, root);
        if (findParent && findParent.next) {
            _.remove(findParent.next, function (d) {
                return d.id == target.id;
            });
        }
    },
}