
desc 'recreate sprite sheets'
task 'resprite' do
  require 'sprite_factory'

  SpriteFactory.run!('images/sprites', :layout => :packed, :output_style => 'images/sprites.js', :margin => 5, :nocomments => true) do |images|
    SpriteHelper.javascript_style("SPRITES", images)
  end

  SpriteFactory.run!('images/background', :layout => :vertical, :output_style => 'images/background.js', :margin => 5, :nocomments => true) do |images|
    SpriteHelper.javascript_style("BACKGROUND", images)
  end

end

#------------------------------------------------------------------------------

module SpriteHelper

  # slightly unusual use of sprite-factory to generate a javascript object structure instead of CSS attributes...
  def self.javascript_style(variable, images)
    maxname = images.keys.inject(0) {|n,key| [n,key.length].max }
    rules = []
    images.each do |name, i|
      name       = name.upcase
      whitespace = ' '*(maxname-name.length)
      x          = '%4d' % i[:cssx]
      y          = '%4d' % i[:cssy]
      w          = '%4d' % i[:cssw]
      h          = '%4d' % i[:cssh]
      rules << "  #{name}: #{whitespace}{ x: #{x}, y: #{y}, w: #{w}, h: #{h} }"
    end
    "var #{variable} = {\n#{rules.join(",\n")}\n};"
  end

end
