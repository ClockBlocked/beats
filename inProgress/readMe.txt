The files in this folder are formatted & refactored in the direction I am wanting to go 
with the CSS ReNaming & ReFactoring 'task'.

My overall goal:
For all of the CSS Selectors ( globally;  in my HTML, CSS  and JavaScript Files ) to be easier,
much more readable & maintainable with one-word ( common ) / two-word ( somewhat ) / three-word ( MAX )
Naming Convention AND Nested CSS Syntax ( occasionally using data-* Attributes ) to make it to
where it IS possible to use such Short Selector Names ¹( see below ).





1.
```


/* Example CSS */
[data-page="error"] {

  .hero {

    .body {}

    .info {}

    .links {}

       &:hover {}

       &::after {}
  }

  
  
}


[data-page="blog"] {

  .hero {

    .card {}

    .info {}

    .links {}

       &:hover {}

       &::after {}
  }

  
  
}
/* End of Example */


```
