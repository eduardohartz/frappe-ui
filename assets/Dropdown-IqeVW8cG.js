import { ay as defineComponent, cl as useRouter, bG as useAttrs, aW as computed, c$ as _sfc_main$1, d0 as _sfc_main$2, d1 as _sfc_main$3, d2 as _sfc_main$4, d3 as _sfc_main$5, d4 as _sfc_main$6, d5 as _sfc_main$7, d6 as _sfc_main$8, d7 as _sfc_main$9, aB as openBlock, aC as createBlock, aD as withCtx, aE as createVNode, aZ as renderSlot, aS as normalizeProps, aL as mergeProps, aM as createTextVNode, aN as toDisplayString, aR as normalizeClass, aG as createElementBlock, aK as Fragment, aJ as renderList, aH as createCommentVNode, bx as resolveDynamicComponent, aF as createBaseVNode } from "./vendor-VBjD7OBI.js";
import { B as Button } from "./Button-jmzwZM6o.js";
import { F as FeatherIcon } from "./FeatherIcon-DiTbYzJd.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "Dropdown",
  props: {
    button: { type: Object, required: false },
    options: { type: Array, required: false, default: () => [] },
    placement: { type: String, required: false, default: "left" }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const router = useRouter();
    const attrs = useAttrs();
    const props = __props;
    const handleItemClick = (item) => {
      if (item.route) {
        router.push(item.route);
      } else if (item.onClick) {
        item.onClick();
      }
    };
    const normalizeDropdownItem = (option) => {
      return {
        label: option.label,
        theme: option.theme || "gray",
        icon: option.icon,
        component: option.component,
        onClick: () => handleItemClick(option),
        submenu: option.submenu
      };
    };
    const getIconColor = (item) => item.theme === "red" ? "text-ink-red-3" : "text-ink-gray-6";
    const getTextColor = (item) => item.theme === "red" ? "text-ink-red-3" : "text-ink-gray-7";
    const getBackgroundColor = (item) => item.theme === "red" ? "focus:bg-surface-red-3 data-[highlighted]:bg-surface-red-3 data-[state=open]:bg-surface-red-3" : "focus:bg-surface-gray-3 data-[highlighted]:bg-surface-gray-3 data-[state=open]:bg-surface-gray-3";
    const getSubmenuBackgroundColor = (item) => getBackgroundColor(item) + " data-[state=open]:bg-surface-" + (item.theme === "red" ? "red-3" : "gray-3");
    const processOptionsIntoGroups = (options) => {
      let groups2 = [];
      let currentGroup = null;
      let i = 0;
      for (let option of options) {
        if (option == null) {
          continue;
        }
        if ("group" in option) {
          if (currentGroup) {
            groups2.push(currentGroup);
            currentGroup = null;
          }
          let groupOption = {
            key: i,
            ...option,
            items: filterOptions(option.items)
          };
          groups2.push(groupOption);
        } else {
          if (!currentGroup) {
            currentGroup = {
              key: i,
              group: "",
              hideLabel: true,
              items: []
            };
          }
          currentGroup.items.push(...filterOptions([option]));
        }
        i++;
      }
      if (currentGroup) {
        groups2.push(currentGroup);
      }
      return groups2;
    };
    const getSubmenuGroups = (submenuOptions) => {
      return processOptionsIntoGroups(submenuOptions);
    };
    const filterOptions = (options) => {
      return (options || []).filter(Boolean).filter((option) => option.condition ? option.condition() : true).map((option) => normalizeDropdownItem(option));
    };
    const cssClasses = {
      // Container classes
      dropdownContent: "min-w-40 divide-y divide-outline-gray-modals rounded-lg bg-surface-modal shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none dropdown-content",
      groupContainer: "p-1.5",
      // Label classes
      groupLabel: "flex h-7 items-center px-2 text-sm font-medium",
      itemLabel: "whitespace-nowrap",
      // Icon classes
      itemIcon: "mr-2 h-4 w-4 flex-shrink-0",
      chevronIcon: "ml-auto h-4 w-4 flex-shrink-0",
      // Button classes
      itemButton: "group flex h-7 w-full items-center rounded px-2 text-base focus:outline-none",
      submenuTrigger: "group flex h-7 w-full items-center rounded px-2 text-base text-ink-gray-6 focus:outline-none"
    };
    const groups = computed(() => {
      return processOptionsIntoGroups(props.options);
    });
    const contentSide = computed(() => {
      return "bottom";
    });
    const contentAlign = computed(() => {
      if (props.placement === "left") return "start";
      if (props.placement === "right") return "end";
      if (props.placement === "center") return "center";
      return "start";
    });
    const __returned__ = { router, attrs, props, handleItemClick, normalizeDropdownItem, getIconColor, getTextColor, getBackgroundColor, getSubmenuBackgroundColor, processOptionsIntoGroups, getSubmenuGroups, filterOptions, cssClasses, groups, contentSide, contentAlign, get DropdownMenuRoot() {
      return _sfc_main$1;
    }, get DropdownMenuTrigger() {
      return _sfc_main$2;
    }, get DropdownMenuPortal() {
      return _sfc_main$3;
    }, get DropdownMenuContent() {
      return _sfc_main$4;
    }, get DropdownMenuLabel() {
      return _sfc_main$5;
    }, get DropdownMenuItem() {
      return _sfc_main$6;
    }, get DropdownMenuSub() {
      return _sfc_main$7;
    }, get DropdownMenuSubTrigger() {
      return _sfc_main$8;
    }, get DropdownMenuSubContent() {
      return _sfc_main$9;
    }, get Button() {
      return Button;
    }, FeatherIcon };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock($setup["DropdownMenuRoot"], null, {
    default: withCtx(({ open }) => [
      createVNode(
        $setup["DropdownMenuTrigger"],
        { "as-child": "" },
        {
          default: withCtx(() => [
            _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", normalizeProps(mergeProps({ key: 0 }, { open, ...$setup.attrs })), void 0, true) : (openBlock(), createBlock(
              $setup["Button"],
              mergeProps({
                key: 1,
                active: false
              }, { ...$props.button, ...$setup.attrs }),
              {
                default: withCtx(() => {
                  var _a;
                  return [
                    createTextVNode(
                      toDisplayString($props.button ? ((_a = $props.button) == null ? void 0 : _a.label) || null : "Options"),
                      1
                      /* TEXT */
                    )
                  ];
                }),
                _: 1
                /* STABLE */
              },
              16
              /* FULL_PROPS */
            ))
          ]),
          _: 2
          /* DYNAMIC */
        },
        1024
        /* DYNAMIC_SLOTS */
      ),
      createVNode($setup["DropdownMenuPortal"], null, {
        default: withCtx(() => [
          createVNode($setup["DropdownMenuContent"], {
            class: normalizeClass([
              $setup.cssClasses.dropdownContent,
              {
                "origin-top-left": $props.placement == "left",
                "origin-top-right": $props.placement == "right",
                "origin-top": $props.placement == "center"
              }
            ]),
            side: $setup.contentSide,
            align: $setup.contentAlign,
            "side-offset": 4
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList($setup.groups, (group) => {
                  return openBlock(), createElementBlock(
                    Fragment,
                    {
                      key: group.key
                    },
                    [
                      group.items.length ? (openBlock(), createElementBlock(
                        "div",
                        {
                          key: 0,
                          class: normalizeClass($setup.cssClasses.groupContainer)
                        },
                        [
                          group.group && !group.hideLabel ? (openBlock(), createBlock($setup["DropdownMenuLabel"], {
                            key: 0,
                            class: normalizeClass([$setup.cssClasses.groupLabel, $setup.getTextColor(group)])
                          }, {
                            default: withCtx(() => [
                              createTextVNode(
                                toDisplayString(group.group),
                                1
                                /* TEXT */
                              )
                            ]),
                            _: 2
                            /* DYNAMIC */
                          }, 1032, ["class"])) : createCommentVNode("v-if", true),
                          (openBlock(true), createElementBlock(
                            Fragment,
                            null,
                            renderList(group.items, (item) => {
                              return openBlock(), createBlock($setup["DropdownMenuItem"], {
                                key: item.label,
                                "as-child": "",
                                onSelect: item.onClick
                              }, {
                                default: withCtx(() => [
                                  item.component ? (openBlock(), createBlock(resolveDynamicComponent(item.component), {
                                    key: 0,
                                    active: false
                                  })) : item.submenu ? (openBlock(), createBlock(
                                    $setup["DropdownMenuSub"],
                                    { key: 1 },
                                    {
                                      default: withCtx(() => [
                                        createVNode(
                                          $setup["DropdownMenuSubTrigger"],
                                          { "as-child": "" },
                                          {
                                            default: withCtx(() => [
                                              createBaseVNode(
                                                "button",
                                                {
                                                  class: normalizeClass([
                                                    $setup.cssClasses.submenuTrigger,
                                                    $setup.getSubmenuBackgroundColor(item)
                                                  ])
                                                },
                                                [
                                                  item.icon && typeof item.icon === "string" ? (openBlock(), createBlock($setup["FeatherIcon"], {
                                                    key: 0,
                                                    name: item.icon,
                                                    class: normalizeClass([$setup.cssClasses.itemIcon, $setup.getIconColor(item)]),
                                                    "aria-hidden": "true"
                                                  }, null, 8, ["name", "class"])) : item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                                    key: 1,
                                                    class: normalizeClass([$setup.cssClasses.itemIcon, $setup.getIconColor(item)])
                                                  }, null, 8, ["class"])) : createCommentVNode("v-if", true),
                                                  createBaseVNode(
                                                    "span",
                                                    {
                                                      class: normalizeClass([$setup.cssClasses.itemLabel, $setup.getTextColor(item)])
                                                    },
                                                    toDisplayString(item.label),
                                                    3
                                                    /* TEXT, CLASS */
                                                  ),
                                                  createVNode($setup["FeatherIcon"], {
                                                    name: "chevron-right",
                                                    class: normalizeClass([$setup.cssClasses.chevronIcon, $setup.getIconColor(item)]),
                                                    "aria-hidden": "true"
                                                  }, null, 8, ["class"])
                                                ],
                                                2
                                                /* CLASS */
                                              )
                                            ]),
                                            _: 2
                                            /* DYNAMIC */
                                          },
                                          1024
                                          /* DYNAMIC_SLOTS */
                                        ),
                                        createVNode(
                                          $setup["DropdownMenuPortal"],
                                          null,
                                          {
                                            default: withCtx(() => [
                                              createVNode($setup["DropdownMenuSubContent"], {
                                                class: normalizeClass($setup.cssClasses.dropdownContent),
                                                "side-offset": 4
                                              }, {
                                                default: withCtx(() => [
                                                  (openBlock(true), createElementBlock(
                                                    Fragment,
                                                    null,
                                                    renderList($setup.getSubmenuGroups(item.submenu), (submenuGroup) => {
                                                      return openBlock(), createElementBlock(
                                                        "div",
                                                        {
                                                          key: submenuGroup.key,
                                                          class: normalizeClass($setup.cssClasses.groupContainer)
                                                        },
                                                        [
                                                          submenuGroup.group && !submenuGroup.hideLabel ? (openBlock(), createBlock($setup["DropdownMenuLabel"], {
                                                            key: 0,
                                                            class: normalizeClass($setup.cssClasses.groupLabel)
                                                          }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(
                                                                toDisplayString(submenuGroup.group),
                                                                1
                                                                /* TEXT */
                                                              )
                                                            ]),
                                                            _: 2
                                                            /* DYNAMIC */
                                                          }, 1032, ["class"])) : createCommentVNode("v-if", true),
                                                          (openBlock(true), createElementBlock(
                                                            Fragment,
                                                            null,
                                                            renderList(submenuGroup.items, (subItem) => {
                                                              return openBlock(), createBlock($setup["DropdownMenuItem"], {
                                                                key: subItem.label,
                                                                "as-child": "",
                                                                onSelect: () => $setup.handleItemClick(subItem)
                                                              }, {
                                                                default: withCtx(() => [
                                                                  subItem.component ? (openBlock(), createBlock(resolveDynamicComponent(subItem.component), {
                                                                    key: 0,
                                                                    active: false
                                                                  })) : (openBlock(), createElementBlock(
                                                                    "button",
                                                                    {
                                                                      key: 1,
                                                                      class: normalizeClass([
                                                                        $setup.cssClasses.itemButton,
                                                                        $setup.getBackgroundColor(subItem)
                                                                      ])
                                                                    },
                                                                    [
                                                                      subItem.icon && typeof subItem.icon === "string" ? (openBlock(), createBlock($setup["FeatherIcon"], {
                                                                        key: 0,
                                                                        name: subItem.icon,
                                                                        class: normalizeClass([
                                                                          $setup.cssClasses.itemIcon,
                                                                          $setup.getIconColor(subItem)
                                                                        ]),
                                                                        "aria-hidden": "true"
                                                                      }, null, 8, ["name", "class"])) : subItem.icon ? (openBlock(), createBlock(resolveDynamicComponent(subItem.icon), {
                                                                        key: 1,
                                                                        class: normalizeClass([
                                                                          $setup.cssClasses.itemIcon,
                                                                          $setup.getIconColor(subItem)
                                                                        ])
                                                                      }, null, 8, ["class"])) : createCommentVNode("v-if", true),
                                                                      createBaseVNode(
                                                                        "span",
                                                                        {
                                                                          class: normalizeClass([
                                                                            $setup.cssClasses.itemLabel,
                                                                            $setup.getTextColor(subItem)
                                                                          ])
                                                                        },
                                                                        toDisplayString(subItem.label),
                                                                        3
                                                                        /* TEXT, CLASS */
                                                                      )
                                                                    ],
                                                                    2
                                                                    /* CLASS */
                                                                  ))
                                                                ]),
                                                                _: 2
                                                                /* DYNAMIC */
                                                              }, 1032, ["onSelect"]);
                                                            }),
                                                            128
                                                            /* KEYED_FRAGMENT */
                                                          ))
                                                        ],
                                                        2
                                                        /* CLASS */
                                                      );
                                                    }),
                                                    128
                                                    /* KEYED_FRAGMENT */
                                                  ))
                                                ]),
                                                _: 2
                                                /* DYNAMIC */
                                              }, 1032, ["class"])
                                            ]),
                                            _: 2
                                            /* DYNAMIC */
                                          },
                                          1024
                                          /* DYNAMIC_SLOTS */
                                        )
                                      ]),
                                      _: 2
                                      /* DYNAMIC */
                                    },
                                    1024
                                    /* DYNAMIC_SLOTS */
                                  )) : (openBlock(), createElementBlock(
                                    "button",
                                    {
                                      key: 2,
                                      class: normalizeClass([$setup.cssClasses.itemButton, $setup.getBackgroundColor(item)])
                                    },
                                    [
                                      item.icon && typeof item.icon === "string" ? (openBlock(), createBlock($setup["FeatherIcon"], {
                                        key: 0,
                                        name: item.icon,
                                        class: normalizeClass([$setup.cssClasses.itemIcon, $setup.getIconColor(item)]),
                                        "aria-hidden": "true"
                                      }, null, 8, ["name", "class"])) : item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                        key: 1,
                                        class: normalizeClass([$setup.cssClasses.itemIcon, $setup.getIconColor(item)])
                                      }, null, 8, ["class"])) : createCommentVNode("v-if", true),
                                      createBaseVNode(
                                        "span",
                                        {
                                          class: normalizeClass([$setup.cssClasses.itemLabel, $setup.getTextColor(item)])
                                        },
                                        toDisplayString(item.label),
                                        3
                                        /* TEXT, CLASS */
                                      )
                                    ],
                                    2
                                    /* CLASS */
                                  ))
                                ]),
                                _: 2
                                /* DYNAMIC */
                              }, 1032, ["onSelect"]);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ],
                        2
                        /* CLASS */
                      )) : createCommentVNode("v-if", true)
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          }, 8, ["class", "side", "align"])
        ]),
        _: 1
        /* STABLE */
      })
    ]),
    _: 3
    /* FORWARDED */
  });
}
_sfc_main.__file = "src/components/Dropdown/Dropdown.vue";
const Dropdown = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7f1b18bd"], ["__file", "/home/runner/work/frappe-ui/frappe-ui/src/components/Dropdown/Dropdown.vue"]]);
export {
  Dropdown as D
};
