
# AR Keyboard Layout

[![Designl](/OBoardDesign.png)](https://iusmusic.github.io/


## Publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload every file from this bundle to the repository root.
3. In the repository settings, open **Pages**.
4. Set the source to **Deploy from a branch**.
5. Choose the `main` branch and `/root` folder.
6. Save.

The site is fully static and works as GitHub Pages without a build step.

## Files

- `index.html` — the presentation page
- `styles.css` — layout and visual styling
- `script.js` — simple display toggles
- `assets/` — supplied reference images
- `LICENSE.txt` — proprietary all-rights-reserved terms
- `NOTICE.md` — copyright and patent-rights notice
- `.nojekyll` — avoids Jekyll processing on GitHub Pages


# Hexagonal Keyboard Layout
### Pezhman Farhangi — Registered Design

---

## Default Layer

```
            e   f   g
        1   a   x   y   b   2
      3   c   l   m   n   d   4
    5   +   h   o   p   i   6   [enter]
      7   q   j   v   k   r   8
    @   9   s   u   w   t   0   *
      shift  ctrl  !   z   ?   .   -
          alt    [space]    ,
```

---

## Shift Layer

```
            E   F   G
        !   A   X   Y   B   @
      #   C   L   M   N   D   $
    %   =   H   O   P   I   ^   [enter]
      &   Q   J   V   K   R   *
    ~   (   S   U   W   T   )   •
      shift  ctrl  ¡   Z   ¿   :   _
          alt    [space]    ;
```

---

## Key Map Reference

| Row | Default | Shift |
|-----|---------|-------|
| 1 (top) | `e` `f` `g` | `E` `F` `G` |
| 2 | `1` `a` `x` `y` `b` `2` | `!` `A` `X` `Y` `B` `@` |
| 3 | `3` `c` `l` `m` `n` `d` `4` | `#` `C` `L` `M` `N` `D` `$` |
| 4 | `5` `+` `h` `o` `p` `i` `6` `enter` | `%` `=` `H` `O` `P` `I` `^` `enter` |
| 5 | `7` `q` `j` `v` `k` `r` `8` | `&` `Q` `J` `V` `K` `R` `*` |
| 6 | `@` `9` `s` `u` `w` `t` `0` `*` | `~` `(` `S` `U` `W` `T` `)` `•` |
| 7 | `shift` `ctrl` `!` `z` `?` `.` `-` | `shift` `ctrl` `¡` `Z` `¿` `:` `_` |
| 8 (bottom) | `alt` `space` `,` | `alt` `space` `;` |

---

## Special Keys

| Key | Type | Notes |
|-----|------|-------|
| `enter` | Pill (wide) | Right of row 4, outside hex grid |
| `space` | Pill (wide) | Centre of bottom row |
| `shift` | Modifier hex | Activates Shift Layer |
| `ctrl` | Modifier hex | |
| `alt` | Modifier hex | |

---

## Notes

- Layout uses a **honeycomb hex grid** arranged on a circular disc platform.
- Rows alternate between 3, 6, 7, 8, 7, 8, 7 keys to form the honeycomb stagger.
- `enter` and `space` are rendered as rounded-rectangle pill keys, not hexagons.
- Numbers `1`–`9`, `0` and symbols `@` `*` occupy the outer columns.
- Shift layer replaces outer-column numbers with punctuation: `!` `@` `#` `$` `%` `^` `&` `*` `(` `)`.
