# OBOARD

![](/01.png)

[Design](https://iusmusic.github.io/OBOARD)

A static presentation of the hexagonal AR keyboard layout, arranged on a circular disc platform with a honeycomb stagger.

## Publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload every file from this bundle to the repository root.
3. In the repository settings, open **Pages**.
4. Set the source to **Deploy from a branch**.
5. Choose the `main` branch and `/root` folder.
6. Save.

The site is fully static and works on GitHub Pages without a build step.

## Files

- `index.html` — presentation page
- `styles.css` — layout and visual styling
- `script.js` — display toggles
- `assets/` — reference assets
- `LICENSE.txt` — proprietary all-rights-reserved terms
- `NOTICE.md` — copyright and patent-rights notice
- `.nojekyll` — disables Jekyll processing on GitHub Pages

## Hexagonal Keyboard Layout

### Default Layer

```text
            e   f   g
        1   a   x   y   b   2
      3   c   l   m   n   d   4
    5   +   h   o   p   i   6   [enter]
      7   q   j   v   k   r   8
    @   9   s   u   w   t   0   *
      shift  ctrl  !   z   ?   .   -
          alt    [space]    ,
```

### Shift Layer

```text
            E   F   G
        !   A   X   Y   B   @
      #   C   L   M   N   D   $
    %   =   H   O   P   I   ^   [enter]
      &   Q   J   V   K   R   *
    ~   (   S   U   W   T   )   •
      shift  ctrl  ¡   Z   ¿   :   _
          alt    [space]    ;
```

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

## Special Keys

| Key | Type | Notes |
|-----|------|-------|
| `enter` | Pill (wide) | Right of row 4, outside hex grid |
| `space` | Pill (wide) | Center of bottom row |
| `shift` | Modifier hex | Activates Shift layer |
| `ctrl` | Modifier hex | Control modifier |
| `alt` | Modifier hex | Alt modifier |

## Layout Notes

- Uses a **honeycomb hex grid** arranged on a circular disc platform.
- Rows alternate between **3, 6, 7, 8, 7, 8, 7, 3 effective positions** to create the staggered structure.
- `enter` and `space` are **rounded pill keys**, not hexagons.
- Numbers and symbols occupy the outer columns of the layout.
- The Shift layer replaces outer-column numbers with punctuation: `! @ # $ % ^ & * ( )`.
- Default legends should display in **lowercase**, unless **Shift** is held.

**Registered Design**
