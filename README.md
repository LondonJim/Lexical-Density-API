# Lexical Density

Using Express API that takes sentences and returns the lexical density in json format. Lexical density is defined by the number of lexical words divided by the total number of words.

eg. Kat loves going <span style="color:red">to the</span> movies

returns:

```
{ "data":
    {
      overall_density: 0.42
    }
}
```

Multiple sentences can return overall and individual densities:

```
{ "data":
    {
      sentence_density: [ 0.23, 0.1, 1.0, 0.0 ],
      overall_density: 0.42
    }
}
```

##### Routes

Overall density
```
/complexity
```

Sentence density breakdown
```
/complexity?mode=sentences
```
