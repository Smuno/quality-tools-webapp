<template>
  <b-container>
    <!-- Menu para editar texto -->
    <b-row no-gutters v-if="isEditable">
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <b-button-toolbar>
          <b-button-group size="sm">
            <b-button
              title="Paragraph"
              :variant="variantType(isActive.paragraph())"
              @click="commands.paragraph"
            >
              <b-icon icon="paragraph"></b-icon>
            </b-button>
            <b-button
              title="Bold"
              :variant="variantType(isActive.bold())"
              @click="commands.bold"
            >
              <b-icon icon="type-bold"></b-icon>
            </b-button>
            <b-button
              title="Italic"
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
<!-- Espacio de edicion de texto -->
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
  props:{
    isEditable:{
      type:Boolean,
      default:true,
    },
    contentForEditor:{
      type:String,
      default:"<h1>Hola!,</h1><p>Ejemplo de texto, un poco largo para ver como queda y ver aun si extiendo por sobre</p>",
    }
  },
  data() {
    return {
      keepInBounds: true,
      editor: null,
      textJSON: null,
      isOnFocus:false,
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
      editable:this.isEditable,
      content:this.contentForEditor,
      extensions: [
        new Heading({ levels: [1, 2, 3] }),
        new ListItem(),
        new Bold(),
        new Italic()
      ],
      onUpdate: value => {
        clearTimeout(this.timeoutTyping);
        this.timeoutTyping = setTimeout(() => {
          this.textJSON = value.getHTML();
          console.log(value.getHTML());
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
  text-align: left;
}
</style>
