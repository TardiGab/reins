<template>
  <div id="ic95059" style="float: left">
    <div class="iconlarge" data-env="ptr2" data-tree="live" data-game="wow">
      <ins
        style="
          background-image: url(&quot;https://wow.zamimg.com/images/wow/icons/large/achievement_boss_ji-kun.jpg&quot;);
        "
        class=""
      ></ins
      ><del></del><a aria-label="Icon" href="javascript:"></a>
    </div>
  </div>
  <div
    id="tt95059"
    class="wowhead-tooltip wowhead-tooltip-width-restriction wowhead-tooltip-width-320 tooltip-slider"
    style="float: left; padding-top: 1px; visibility: visible; width: 320px"
    data-visible="yes"
  >
    <table>
      <tbody>
        <tr>
          <td>
            <table style="width: 100%">
              <tbody>
                <tr>
                  <td>
                    <!--nstart--><b class="q4">Clutch of Ji-Kun</b
                    ><!--nend--><!--ndstart--><!--ndend--><span
                      class="q whtt-extra whtt-ilvl"
                      ><br />Item Level
                      <!--ilvl-->14</span
                    ><!--bo--><br />Binds when picked up<br />Unique<br />Mount
                    <span class="q0">(Account-wide)</span
                    ><!--ebstats--><!--egstats--><!--eistats--><!--nameDescStats-->
                  </td>
                </tr>
              </tbody>
            </table>
            <table style="width: 100%">
              <tbody>
                <tr>
                  <td>
                    <span class="q2"
                      >Use:
                      <a href="/ptr-2/spell=139448/clutch-of-ji-kun"
                        >Teaches you how to summon this mount. This is a flying
                        mount.</a
                      ></span
                    ><br /><!--useText:0:2--><span id="useText2" class="q2"
                      ><!--useEffect:0:2--><a
                        href="/ptr-2/spell=139448/clutch-of-ji-kun"
                        class="q2"
                        >Summons and dismisses a rideable Clutch of Ji-Kun.
                        &nbsp;This is a flying mount.</a
                      ><!--useEffect:2--></span
                    ><!--useText:2--><!--itemEffects:1--><br />Requires level
                    <!--minlvl-->1 to
                    <!--maxlvl-->90 [(<a
                      href="javascript:"
                      onmousedown="return false;"
                      class="tip"
                      style="color: white; cursor: pointer"
                      onclick="WH.staticTooltipLevelClick(this, null, 0)"
                      onmouseover="
                        WH.Tooltips.showAtCursor(
                          event,
                          '&lt;span class=\'q2\'&gt;' +
                            WH.TERMS.clicktochangelevel_stc +
                            '&lt;/span&gt;',
                        )
                      "
                      onmousemove="WH.Tooltips.cursorUpdate(event)"
                      onmouseout="WH.Tooltips.hide()"
                      ><!--lvl-->90</a
                    >)]<br />Requires
                    <a href="/ptr-2/spell=33388/apprentice-riding" class="q1"
                      >Apprentice Riding</a
                    ><br /><!--pvpEquip--><!--pvpEquip--><br /><br /><span
                      class="q"
                      >"Although Ji-Kun feasted on the failed creations of mogu
                      flesh-shapers, her progeny is willing to eat more
                      pedestrian carcasses."</span
                    ><br /><span style="color: #ffd200">Drop: </span
                    >Ji-Kun<br /><span style="color: #ffd200">Zone: </span
                    >Throne of Thunder
                    <div class="whtt-extra whtt-dropchance">
                      Drop Chance: 2.31%
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <!--i?95059:1:90:90:872:0-->
          </td>
          <th style="background-position: top right"></th>
        </tr>
        <tr>
          <th style="background-position: bottom left"></th>
          <th style="background-position: bottom right"></th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.wowhead-tooltip {
  border: 2px solid $border-container;
  border-radius: 1rem;
  overflow: hidden !important;
  background-color: #241d19 !important;
  box-shadow: 0 0 0px 1px #000 inset;

  @supports (corner-shape: bevel) {
    corner-shape: bevel;
    border-radius: $corner-shape-m;
  }

  table {
    tbody {
      tr {
        th:empty {
          display: none;
        }
      }

      tr:nth-child(2) {
        display: none;
      }
    }
  }

  td {
    display: block;
    padding: 0;
    font-family: "tiller", sans-serif;
    font-size: $small;

    span {
      margin-bottom: 0.25rem !important;
    }
  }

  tr {
    display: block;
    padding: 0.5rem;
  }

  td,
  th {
    background: none !important;

    padding: 0 !important;
  }

  b {
    font-size: $main-size;
    font-weight: 700;
  }
}
</style>
