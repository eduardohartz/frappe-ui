import { ay as defineComponent, aW as computed, db as ue, dc as ce, dd as oe, de, aB as openBlock, aC as createBlock, aD as withCtx, aF as createBaseVNode, aR as normalizeClass, aM as createTextVNode, aN as toDisplayString, aH as createCommentVNode, aE as createVNode, bm as withKeys, a_ as withModifiers } from "./vendor-BvKrC49l.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
var SwitchVariant = /* @__PURE__ */ ((SwitchVariant2) => {
  SwitchVariant2[SwitchVariant2["DEFAULT"] = 0] = "DEFAULT";
  SwitchVariant2[SwitchVariant2["ONLY_LABEL"] = 1] = "ONLY_LABEL";
  SwitchVariant2[SwitchVariant2["WITH_LABEL_AND_DESCRIPTION"] = 2] = "WITH_LABEL_AND_DESCRIPTION";
  return SwitchVariant2;
})(SwitchVariant || {});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Switch",
  props: {
    size: { type: String, required: false, default: "sm" },
    label: { type: String, required: false, default: "" },
    description: { type: String, required: false, default: "" },
    disabled: { type: Boolean, required: false, default: false },
    modelValue: { type: [Boolean, Number, String], required: false }
  },
  emits: ["change", "update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const switchType = computed(() => {
      if (props.label && props.description) {
        return 2;
      }
      if (props.label) {
        return 1;
      }
      return 0;
    });
    const switchClasses = computed(() => {
      return [
        "relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-transparent transition-colors duration-100 ease-in-out items-center",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-outline-gray-3",
        "disabled:cursor-not-allowed disabled:bg-surface-gray-3",
        props.modelValue ? "bg-surface-gray-7 enabled:hover:bg-surface-gray-6 active:bg-surface-gray-5 group-hover:enabled:bg-surface-gray-6" : "bg-surface-gray-4 enabled:hover:bg-gray-400 active:bg-gray-500 group-hover:enabled:bg-gray-400",
        props.size === "md" ? "h-5 w-8 border-[3px]" : "h-4 w-[26px] border-2"
      ];
    });
    const switchCircleClasses = computed(() => {
      return [
        "pointer-events-none inline-block transform rounded-full bg-surface-white shadow ring-0 transition duration-100 ease-in-out",
        props.size === "md" ? "h-3.5 w-3.5" : "h-3 w-3",
        props.size === "md" ? props.modelValue ? "translate-x-3 rtl:-translate-x-3" : "translate-x-0" : props.modelValue ? "translate-x-2.5 rtl:-translate-x-2.5" : "translate-x-0"
      ];
    });
    const switchLabelClasses = computed(() => {
      return [
        "font-medium leading-normal",
        props.disabled && switchType.value === 1 ? "text-ink-gray-4" : "text-ink-gray-8",
        props.size === "md" ? "text-lg" : "text-base"
      ];
    });
    const switchDescriptionClasses = computed(() => {
      return ["max-w-xs text-p-base text-ink-gray-7"];
    });
    const switchGroupClasses = computed(() => {
      const classes = ["flex justify-between"];
      if (switchType.value === 1) {
        classes.push(
          "group items-center space-x-3 cursor-pointer rounded focus-visible:bg-surface-gray-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-outline-gray-3"
        );
        classes.push(
          props.disabled ? "cursor-not-allowed" : "hover:bg-surface-gray-3 active:bg-surface-gray-4"
        );
        classes.push(props.size === "md" ? "px-3 py-1.5" : "px-2.5 py-1.5");
      } else if (switchType.value === 2) {
        classes.push("items-start");
        classes.push(props.size === "md" ? "space-x-3.5" : "space-x-2.5");
      }
      return classes;
    });
    const labelContainerClasses = computed(() => {
      return ["flex flex-col space-y-0.5"];
    });
    const __returned__ = { SwitchVariant, props, emit, switchType, switchClasses, switchCircleClasses, switchLabelClasses, switchDescriptionClasses, switchGroupClasses, labelContainerClasses, get Switch() {
      return ue;
    }, get SwitchDescription() {
      return ce;
    }, get SwitchGroup() {
      return oe;
    }, get SwitchLabel() {
      return de;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock($setup["SwitchGroup"], {
    as: "div",
    tabindex: $setup.switchType == $setup.SwitchVariant.ONLY_LABEL ? 0 : -1,
    onKeyup: _cache[1] || (_cache[1] = withKeys(withModifiers(($event) => $setup.emit("update:modelValue", !$props.modelValue), ["self"]), ["space"])),
    class: normalizeClass($setup.switchGroupClasses)
  }, {
    default: withCtx(() => [
      createBaseVNode(
        "span",
        {
          class: normalizeClass($setup.labelContainerClasses)
        },
        [
          $setup.props.label ? (openBlock(), createBlock($setup["SwitchLabel"], {
            key: 0,
            as: "span",
            class: normalizeClass($setup.switchLabelClasses)
          }, {
            default: withCtx(() => [
              createTextVNode(
                toDisplayString($setup.props.label),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["class"])) : createCommentVNode("v-if", true),
          $setup.props.description ? (openBlock(), createBlock($setup["SwitchDescription"], {
            key: 1,
            as: "span",
            class: normalizeClass($setup.switchDescriptionClasses)
          }, {
            default: withCtx(() => [
              createTextVNode(
                toDisplayString($setup.props.description),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["class"])) : createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      ),
      createVNode($setup["Switch"], {
        disabled: $setup.props.disabled,
        "model-value": $props.modelValue ? true : false,
        class: normalizeClass($setup.switchClasses),
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.emit("update:modelValue", !$props.modelValue))
      }, {
        default: withCtx(() => [
          createBaseVNode(
            "span",
            {
              "aria-hidden": "true",
              class: normalizeClass($setup.switchCircleClasses)
            },
            null,
            2
            /* CLASS */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["disabled", "model-value", "class"])
    ]),
    _: 1
    /* STABLE */
  }, 8, ["tabindex", "class"]);
}
_sfc_main.__file = "src/components/Switch/Switch.vue";
const Switch = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/frappe-ui/frappe-ui/src/components/Switch/Switch.vue"]]);
export {
  Switch as S
};
