import Blits from '@lightningjs/blits'
import HorizontalContainer from '../components/HorizontalContainer'
import VerticalContainer from '../components/VerticalContainer'
import Item from '../components/Item'
import constructRails from '../utils/consctructRails'

export default Blits.Component('VodPreview', {
  components: {
    HorizontalContainer,
    VerticalContainer,
  },
  template: `
    <Element>
      <Element ref="headerRef">
        <Text content="VOD PREVIEW - Poziva VerticalContainer koji poziva HorizontalContainer" maxwidth="1800" x="100" />
        <Text
          content="Da bi radilo kako treba neophodno je
      struktuirati datu u formatu kao na primeru ispod"
          maxwidth="1800"
          y="45"
          alpha="0.3"
          x="100"
        />
      </Element>
    
      <VerticalContainer x="100" y="150" ref="verCont" items="$rails" autoScroll="true"></VerticalContainer>
    </Element>
  `,
  state() {
    return {
      assets: [
        {
          color: '#ef4444',
          width: 200,
          height: 200,
          id: 0,
        },
        {
          color: '#f97316',
          width: 200,
          height: 200,
          id: 1,
        },
        {
          color: '#84cc16',
          width: 200,
          height: 200,
          id: 2,
        },
        {
          color: '#10b981',
          width: 200,
          height: 200,
          id: 3,
        },
        {
          color: '#06b6d4',
          width: 200,
          height: 200,
          id: 4,
        },
        {
          color: '#3b82f6',
          width: 200,
          height: 200,
          id: 5,
        },
        {
          color: '#8b5cf6',
          width: 200,
          height: 200,
          id: 6,
        },
        {
          color: '#d946ef',
          width: 200,
          height: 200,
          id: 7,
        },
        {
          color: '#f43f5e',
          width: 200,
          height: 200,
          id: 8,
        },
      ],
      rails: [
        {
          title: 'Rejl broj 1',
          rowH: 400,
          type: HorizontalContainer,
          items: [
            { color: '#ef4444', width: 400, height: 400, type: Item },
            { color: '#f97316', width: 400, height: 400, type: Item },
            { color: '#84cc16', width: 400, height: 400, type: Item },
            { color: '#ef4444', width: 400, height: 400, type: Item },
            { color: '#f97316', width: 400, height: 400, type: Item },
            { color: '#84cc16', width: 400, height: 400, type: Item },
            { color: '#ef4444', width: 400, height: 400, type: Item },
            { color: '#f97316', width: 400, height: 400, type: Item },
            { color: '#84cc16', width: 400, height: 400, type: Item },
          ],
        },
        {
          title: 'Single Big Banner',
          rowH: 500,
          type: Item,
          items: {
            color: '#22c55e',
            width: 1200,
            height: 500,
            type: Item,
          },
        },
        {
          title: 'Rejl broj 2',
          rowH: 300,
          type: HorizontalContainer,
          items: [
            { color: '#10b981', width: 200, height: 300, type: Item },
            { color: '#06b6d4', width: 200, height: 300, type: Item },
            { color: '#3b82f6', width: 200, height: 300, type: Item },
            { color: '#10b981', width: 200, height: 300, type: Item },
            { color: '#06b6d4', width: 200, height: 300, type: Item },
            { color: '#3b82f6', width: 200, height: 300, type: Item },
            { color: '#10b981', width: 200, height: 300, type: Item },
            { color: '#06b6d4', width: 200, height: 300, type: Item },
            // { color: '#3b82f6', width: 200, height: 300, type: Item },
            // { color: '#3b82f6', width: 200, height: 300, type: Item },
            // { color: '#10b981', width: 200, height: 300, type: Item },
            // { color: '#06b6d4', width: 200, height: 300, type: Item },
            // { color: '#3b82f6', width: 200, height: 300, type: Item },
          ],
        },
        // {
        //   type: Item,
        //   items: { color: '#3b82f6', width: 200, height: 200 },
        // },
        {
          title: 'Rejl broj 3',
          rowH: 200,
          type: HorizontalContainer,
          items: [
            { color: '#10b981', width: 200, height: 200, type: Item },
            { color: '#06b6d4', width: 200, height: 200, type: Item },
            { color: '#06b6d4', width: 200, height: 200, type: Item },
            { color: '#06b6d4', width: 200, height: 200, type: Item },
          ],
        },
        {
          title: 'Rejl broj 4',
          rowH: 200,
          type: HorizontalContainer,
          items: [{ color: '#10b981', width: 200, height: 200, type: Item }],
        },
        // {
        //   title: 'Rejl broj 4',
        //   rowH: 800,
        //   type: HorizontalContainer,
        //   items: [
        //     { color: '#10b981', width: 1280, height: 800, type: Item },
        //     { color: '#06b6d4', width: 1280, height: 800, type: Item },
        //     { color: '#06b6d4', width: 1280, height: 800, type: Item },
        //     { color: '#06b6d4', width: 1280, height: 800, type: Item },
        //   ],
        // },
      ],
      railsRaw: [
        {
          items: [
            { color: '#10b981' },
            { color: '#06b6d4' },
            { color: '#06b6d4' },
            { color: '#06b6d4' },
          ],
        },
        {
          items: [{ color: '#10b981' }],
        },
      ],
      railsPrepared: constructRails(
        [
          {
            items: [
              { color: '#10b981' },
              { color: '#06b6d4' },
              { color: '#06b6d4' },
              { color: '#06b6d4' },
            ],
          },
          {
            items: [{ color: '#10b981' }],
          },
        ],
        {
          startIndex: 3,
          railType: HorizontalContainer,
          rowH: 200,
          itemDefaults: {
            width: 200,
            height: 200,
            type: Item,
          },
        }
      ),
    }
  },
  hooks: {
    focus() {
      this.$select('verCont').$focus()
    },
  },
  methods: {
    constructRails() {},
  },
})
