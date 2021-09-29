<svelte:options tag="what-ever" />

<script>
  // make sure component Foo is available, but we don't import
  // it... we'll use it with it's tag <my-foo /> (see bellow)
  import './Foo.svelte'
  export let name = 'World'
</script>

<p>Hello, {name}!</p>

<my-foo {name} />

<style>
 p { color: skyblue; }
</style>
