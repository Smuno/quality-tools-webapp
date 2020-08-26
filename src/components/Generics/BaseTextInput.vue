<template>
  <b-container>
    <b-row no-gutters>
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <b-button-toolbar>
          <b-button-group size="sm">
            <b-button
              title="Paragraph"
              :class="{ 'is-active': isActive.paragraph() }"
              :variant="variantType(isActive.paragraph())"
              @click="commands.paragraph"
            >
              <b-icon icon="paragraph"></b-icon>
            </b-button>
            <b-button
              title="Bold"
              :class="{ 'is-active': isActive.bold() }"
              :variant="variantType(isActive.bold())"
              @click="commands.bold"
            >
              <b-icon icon="type-bold"></b-icon>
            </b-button>
            <b-button
              title="Italic"
              :class="{ 'is-active': isActive.italic() }"
              :variant="variantType(isActive.italic())"
              @click="commands.italic"
            >
              <b-icon icon="type-italic"></b-icon>
            </b-button>

            <b-dropdown text="Header">
              <b-dropdown-item @click="commands.heading({ level: 1 })">
                <b-icon icon="type-h1"></b-icon>
              </b-dropdown-item>
              <b-dropdown-item @click="commands.heading({ level: 2 })">
                <b-icon icon="type-h2"></b-icon>
              </b-dropdown-item>
              <b-dropdown-item @click="commands.heading({ level: 3 })">
                <b-icon icon="type-h3"></b-icon>
              </b-dropdown-item>
            </b-dropdown>
          </b-button-group>
        </b-button-toolbar>
      </editor-menu-bar>
    </b-row>

    <b-row no-gutters>
      <b-col>
        <EditorContent class="editorContent" :editor="editor" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
//! evento: "new-text"
//import Icon from 'Components/Icon'
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Blockquote,
  BulletList,
  CodeBlock,
  HardBreak,
  Heading,
  ListItem,
  OrderedList,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from "tiptap-extensions";

export default {
  name: "BaseTextInput",
  components: {
    EditorContent,
    EditorMenuBar
  },
  data() {
    return {
      keepInBounds: true,
      editor: null,
      textJSON: null
    };
  },
  methods: {
    variantType: function(isActive) {
      if (isActive) {
        return "dark";
      } else {
        return "secondary";
      }
    }
  },
  computed: {},
  watch: {
    textJSON: function(newVal) {
      this.$emit("new-text", newVal);
    }
  },
  mounted() {
    let timeOutTyping = null;
    this.editor = new Editor({
      content:
        "<h1>Hola!,</h1><p>Ejemplo de texto, un poco largo para ver como queda y ver aun si extiendo por sobre</p>",
      extensions: [
        new Heading({ levels: [1, 2, 3] }),
        new ListItem(),
        new Bold(),
        new Italic()
      ],
      onUpdate: value => {
        clearTimeout(this.timeoutTyping);
        this.timeoutTyping = setTimeout(() => {
          this.textJSON = value.getJSON();
          console.log(value.getJSON());
        }, 1000);
      }
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style lang="scss" scoped>
.editorContent {
  padding: 0rem;
  background-color: #f2fbef;
  text-align: left;
}
</style>
